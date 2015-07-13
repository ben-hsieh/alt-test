import React from "react";
import AltContainer from "alt/AltContainer";

class Favorites extends React.Component {
	render() {
		return (
			<div>Favorites</div>
		);
	}
}


export default class Locations extends React.Component {
	render() {
		return (
			<div>
				<h1>Locations</h1>
				<div>
					刻以嗎!?
				</div>
				<Favorites />
			</div>
		);
	}
}
