import express from "express";
import path from "path";
import ssr from "./build/views/ssr";

const app = express();
// Serving static files
app.use("/build", express.static(path.resolve(__dirname, "build")));
app.use(express.static("src/public"));

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");

// hide powered by express
app.disable("x-powered-by");
// start the server
app.listen(process.env.PORT || 3000); // eslint-disable-line no-undef

// server rendered home page
app.get("/", (req, res) => {
	const { preloadedState, content}  = ssr();
	res.render("index", {title: "Server Rendered Page", preloadedState, content});
});

// Pure client side rendered page
app.get("/client", (req, res) => {
	res.render("index", {title: "Client Side Rendered page"});
});

// stop server during local development
app.get("/exit", (req, res) => {
	if(process.env.PORT) { // eslint-disable-line no-undef
		res.send("Sorry, the server denies your request");
	} else {
		res.send("shutting down");
		process.exit(0); // eslint-disable-line no-undef
	}
});
