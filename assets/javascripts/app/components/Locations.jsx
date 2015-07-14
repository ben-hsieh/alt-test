import React from "react";
import AltContainer from "alt/AltContainer";
import LocationStore from "../stores/LocationStore";
import FavoritesStore from "../stores/FavoritesStore";
import LocationActions from "../actions/LocationActions";

class Favorites extends React.Component {
	render() {

		return (
			<ul>
				{this.props.locations.map((location, i) => {
					return (
						<li key={i}>{location.name}</li>
					);
				})}
			</ul>
		);
	}
}

class AllLocations extends React.Component {

	addFave(e){
		var location = LocationStore.getLocation(
			Number(e.target.getAttribute("data-id"))
		);

		/**
		 * 此 action 會 dispatch 2 個 Store
		 * 1. LocationStore
		 * 2. FavoritesStore
		 */
		LocationActions.favoriteLocation(location);
	}

	render() {
		if(this.props.errorMessage){
			return (
				<div>{this.props.errorMessage}</div>
			);
		}

		/**
		 * 竟然還可以判斷是否正在 Loading
		 */
		if(LocationStore.isLoading()){
			return (
				<div>Loading...</div>
			);
		}

		return (
			<ul>
				{this.props.locations.map((location, i) => {

					var faveButton = (
						<button onClick={this.addFave} data-id={location.id}>
							Favorite
						</button>
					);

					return (
						<li key={i}>
							{location.name}
							{location.has_favorite ? " <3": faveButton}
						</li>
					);
				})}
			</ul>
		);
	}
}


export default class Locations extends React.Component {

	/**
	 * DOM掛好之後, Store馬上讀取資料
	 */
	componentDidMount() {
		// console.log(LocationStore);
		
		/**
		 * fetchLocations 會呼叫2個method:
		 * 1. LocationStore 裡的 handleFetchLocations
		 * 2. LocationSource 裡的 fetchLocations
		 * 順序是先 1 後 2
		 */
		LocationStore.fetchLocations();
	}

	render() {
		return (
			<div>
				<h1>Locations</h1>
				{/* LocationStore 是 AltStore 要使用 AltContainer 來接 */}
				<AltContainer store={LocationStore}>
					<AllLocations />
				</AltContainer>
				<h1>Favorites</h1>
				<AltContainer store={FavoritesStore}>
					<Favorites />
				</AltContainer>
			</div>
		);
	}
}

