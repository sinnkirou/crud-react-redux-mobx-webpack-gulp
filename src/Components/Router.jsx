import React from "react";
import PostForm from "../Containers/PostForm";
import AllPosts from "../Containers/AllPosts";
import { Switch, Route } from "react-router-dom";

const routes = [
	{
		path: "/",
		component: PostForm,
		exact: true,
	},
	{
		path: "/posts",
		component: AllPosts
	}
];

const router = () => (
	<Switch>
		{routes.map(route => (
			<Route {...route} key="Route" />
		))}
	</Switch>
);

export default router;
