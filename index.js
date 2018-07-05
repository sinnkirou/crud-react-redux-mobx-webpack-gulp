import express from "express";
import template from "./build/views/template";
import path from "path";
import ssr from "./build/views/ssr";

const app = express();
// Serving static files
app.use("/build", express.static(path.resolve(__dirname, "build")));

// hide powered by express
app.disable("x-powered-by");
// start the server
app.listen(process.env.PORT || 3000); // eslint-disable-line no-undef

// server rendered home page
app.get("/", (req, res) => {
	const { preloadedState, content}  = ssr();
	const response = template("Server Rendered Page", preloadedState, content);
	res.setHeader("Cache-Control", "assets, max-age=604800");
	res.send(response);
});

// Pure client side rendered page
app.get("/client", (req, res) => {
	let response = template("Client Side Rendered page");
	res.setHeader("Cache-Control", "assets, max-age=604800");
	res.send(response);
});

// tiny trick to stop server during local development

app.get("/exit", (req, res) => {
	if(process.env.PORT) { // eslint-disable-line no-undef
		res.send("Sorry, the server denies your request");
	} else {
		res.send("shutting down");
		process.exit(0); // eslint-disable-line no-undef
	}

});
