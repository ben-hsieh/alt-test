import alt from "../../alt";
import LocationActions from "../actions/LocationActions";
import LocationSource from "../sources/LocationSource";
import FavoritesStore from "./FavoritesStore";

class LocationStore{
	constructor(){
		this.locations = [];
		this.errorMessage = null;

		/**
		 * 新增各項監聽項目 from Actions
		 * this.method 對應=> from Action
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
		 * 給一個非同步的method
		 * (用來讀取資料用)
		 * 它預設會需要4個method:
		 * remote, local, success, error, loading
		 * 好像也可以用 registerAsync?
		 */
		
		this.exportAsync(LocationSource);
	}


	handleUpdateLocations(locations) {
		/**
		 * 這邊一執行就會自動重新 render 了
		 */
		this.locations = locations;
		this.errorMessage = null;
	}

	/**
	 * fetch 前會執行這邊
	 */
	handleFetchLocations() {
		// console.warn("執行 handleFetchLocations!");
		// console.info(this.locations);
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

		console.warn("LocationStore's setFavorites");

		/**
		 * 這行是為了確保 FavoritesStore 有被載入
		 * 再繼續進行
		 * 主要原因是因為 Locations.jsx 那邊的
		 * LocationActions.favoriteLocation
		 * 它會觸發Location, Favorites 的
		 * favoriteLocation 方法
		 * 所以這邊才要等另一邊先結束
		 * 以確保另一邊已 push 進去
		 */
		this.waitFor(FavoritesStore);

		var favoritedLocations = FavoritesStore.getState().locations;

		// console.warn(favoritedLocations);

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


