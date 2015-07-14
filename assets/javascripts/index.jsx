import React from "react";
import Locations from "./app/components/Locations";

export class Index extends React.Component {
	render() {
		return (
			<div>
				不知道為什麼就可以了!
				<Locations />
			</div>
		);
	}
}

React.render(<Index />, document.getElementById("content"));
