import React from "react";
import AltContainer from "alt/AltContainer";
import LocationStore from "../stores/LocationStore";
import FavoritesStore from "../stores/FavoritesStore";
import LocationActions from "../actions/LocationActions";

class Favorites extends React.Component {
	render() {
		return (
			<div>Favorites</div>
		);
	}
}

class AllLocations extends React.Component {

	addFave(e){
		var location = LocationStore.getLocation(
			Number(e.target.getAttribute("data-id"))
		);

		//去 action 找對應的方法
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
							{location.has_favorite ? "<3": faveButton}
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
		LocationStore.fetchLocations();
	}

	render() {
		return (
			<div>
				<h1>Locations</h1>
				{/* 這邊的Store 可以直接喂給 AllLocations with AltContainer? */}
				<AltContainer store={LocationStore}>
					<AllLocations />
				</AltContainer>
				<Favorites />
			</div>
		);
	}
}

