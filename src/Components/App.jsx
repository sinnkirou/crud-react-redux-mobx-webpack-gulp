import React, { Component } from "react";
import PostForm from "../Containers/PostForm";
import AllPosts from "../Containers/AllPosts";

class App extends Component {
	render() {
		return (
			<div className="App" key="App">
				<div className="navbar">
					<h2 className="center ">Post It</h2>
				</div>
				<PostForm />
				<AllPosts />
			</div>
		);
	}
}
export default App;
