import LocationActions from "../actions/LocationActions";

var mockData = [
	{ id: 0, name: "Abu Dhabi" },
	{ id: 1, name: "Berlin" },
	{ id: 2, name: "Bogota" },
	{ id: 3, name: "Buenos Aires" },
	{ id: 4, name: "Cairo" },
	{ id: 5, name: "Chicago" },
	{ id: 6, name: "Lima" },
	{ id: 7, name: "London" },
	{ id: 8, name: "Miami" },
	{ id: 9, name: "Moscow" },
	{ id: 10, name: "Mumbai" },
	{ id: 11, name: "Paris" },
	{ id: 12, name: "San Francisco" }
];

var LocationSource = {

	/**
	 * 這個方法將會被加到 LocationStore裡
	 */
	fetchLocations(){
		return {
			remote(){
				return new Promise((resolve, reject)=>{
					// 這邊就去呼叫 api get data
					setTimeout(()=>{
						if(true){
							//這邊會傳到下面的 success
							resolve(mockData);
						}else{
							//這邊會傳到下面的 error
							reject("Things have broken");
						}
					}, 250);
				});
			},
			local(){
				return null;
			},
			success: LocationActions.updateLocations,
			error: LocationActions.locationsFailed,
			loading: LocationActions.fetchLocations
		};
	}
};

export default LocationSource;
