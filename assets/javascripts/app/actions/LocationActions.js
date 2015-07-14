import alt from "../../alt";

class LocationActions {
	updateLocations(locations){
		this.dispatch(locations);
	}

	fetchLocations(){
		this.dispatch();
	}

	locationsFailed(errorMessage){
		this.dispatch(errorMessage);
	}

	// 它會在 FavoriteStore 被使用
	favoriteLocation(location){
		this.dispatch(location);
	}
}

export default alt.createActions(LocationActions);
