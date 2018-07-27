import React from "react";
import PostForm from "../Containers/PostForm";
import AllPosts from "../Containers/AllPosts";

export function App() {
	return <div className="App" key="App">
		<div className="navbar">
			<h2 className="center ">Post It</h2>
		</div>
		<PostForm />
		<AllPosts />
	</div>;
}
