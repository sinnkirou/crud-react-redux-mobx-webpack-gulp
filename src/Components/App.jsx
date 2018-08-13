import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "./routes";

const App = () => (
	<Router>
		<div className="App" key="App">
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/posts">Posts</Link>
				</li>
			</ul>
			<hr />
			<Switch>
				{routes.map(route => (
					<Route {...route} key="Route" />
				))}
			</Switch>
		</div>
	</Router>
);

export default App;