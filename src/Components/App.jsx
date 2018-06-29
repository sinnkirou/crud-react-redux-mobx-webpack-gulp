import React, { Component } from "react";
import CreatePost from "../Containers/CreatePost";
import AllPosts from "../Containers/AllPosts";

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="navbar">
					<h2 className="center ">Post It</h2>
				</div>
				<CreatePost />
				<AllPosts />
			</div>
		);
	}
}
export default App;
