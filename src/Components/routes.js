import PostForm from "../Containers/PostForm";
import AllPosts from "../Containers/AllPosts";

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

export default routes;
