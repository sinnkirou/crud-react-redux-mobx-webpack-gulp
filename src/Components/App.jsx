import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import Router from "./Router";

const App = () => (
	<BrowserRouter>
		<div className="App" key="App">
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/posts">Posts</Link>
				</li>
			</ul>
			<Router />
		</div>
	</BrowserRouter>
);

export default App;