import alt from "../../alt";
import LocationActions from "../actions/LocationActions";
import LocationSource from "../sources/LocationSource";
import FavoritesStore from "./FavoritesStore";

class LocationStore{
	constructor(){
		this.locations = [];
		this.errorMessage = null;

		/**
		 * 新增各項監聽項目
		 */
		this.bindListeners({
			handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
			handleFetchLocations: LocationActions.FETCH_LOCATIONS,
			handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
			setFavorites: LocationActions.FAVORITE_LOCATION
		});

		/**
		 * 指定公開方法
		 */
		this.exportPublicMethods({
			getLocation: this.getLocation
		});

		/**
		 * 同步方法 ... ?
		 */
		this.exportAsync(LocationSource);
	}


	handleUpdateLocations(locations) {
		this.locations = locations;
		this.errorMessage = null;
	}

	handleFetchLocations() {
		this.locations = [];
	}

	handleLocationsFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}

	resetAllFavorites() {
		this.locations = this.locations.map((location) => {
			return {
				id: location.id,
				name: location.name,
				has_favorite: false
			};
		});
	}

	setFavorites(location) {

		console.log("LocationStore's setFavorites");

		/**
		 * 這行是為了確保 FavoritesStore 有被載入
		 * 再繼續進行
		 */
		this.waitFor(FavoritesStore);

		var favoritedLocations = FavoritesStore.getState().locations;

		console.log(favoritedLocations);

		this.resetAllFavorites();

		favoritedLocations.forEach((location) => {
			// find each location in the array
			for (var i = 0; i < this.locations.length; i += 1) {

				// set has_favorite to true
				if (this.locations[i].id === location.id) {
					this.locations[i].has_favorite = true;
					break;
				}
			}
		});
	}

	getLocation(id){

		/**
		 * 使用 {...} 可以把 getState 裡的 xxx 喂給變數 xxx
		 * ex: getState = {aaa:..., bbb:...}
		 * 使用 { aaa } = this.getState();
		 * 就可以只取 aaa 給 aaa
		 */
		var { locations } = this.getState();
		for (var i = 0; i < locations.length; i++) {
			if(locations[i].id === id){
				return locations[i];
			}
		}

		return null;
	}


}

/**
 * 它會吐回 AltStore 回去
 */
export default alt.createStore(LocationStore, "LocationStore");


