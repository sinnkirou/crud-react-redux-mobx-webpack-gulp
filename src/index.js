import cookieParser from "cookie-parser";
import createError from "http-errors";
import express from "express";
import http from "http";
import logger from "morgan";
import path from "path";
import webpack from "webpack";
import webpackConfig from "../webpack.config";

var debug = require("debug")("crud-react-redux:server"); // eslint-disable-line no-undef

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Applying webpack hot middleware
webpackConfig.map((config) => {
	if (config.target === "web") {
		var compiler = webpack(config);
		app.use(require("webpack-dev-middleware")(compiler, { // eslint-disable-line no-undef
			noInfo: true, publicPath: config.output.publicPath
		}));
		app.use(require("webpack-hot-middleware")(compiler));// eslint-disable-line no-undef
	}
});

// Serving static files
app.use("/dist", express.static(path.resolve(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
	res.render("index", { title: "Client Rendered page" });
});

// stop server during local development
app.get("/exit", (req, res) => {
	if (process.env.PORT) { // eslint-disable-line no-undef
		res.send("Sorry, the server denies your request");
	} else {
		res.send("shutting down");
		process.exit(0); // eslint-disable-line no-undef
	}
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// hide powered by express
app.disable("x-powered-by");

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "3000");// eslint-disable-line no-undef
app.set("port", port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	var bind = typeof port === "string"
		? "Pipe " + port
		: "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
	case "EACCES":
		console.error(bind + " requires elevated privileges"); // eslint-disable-line no-console
		process.exit(1); // eslint-disable-line no-undef
		break;
	case "EADDRINUSE":
		console.error(bind + " is already in use"); // eslint-disable-line no-console
		process.exit(1); // eslint-disable-line no-undef
		break;
	default:
		throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = typeof addr === "string"
		? "pipe " + addr
		: "port " + addr.port;
	debug("Listening on " + bind);
}