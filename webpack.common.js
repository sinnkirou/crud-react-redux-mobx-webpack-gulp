const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const clientConfig = {
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
		publicPath: "/dist/",
		chunkFilename: "[name].bundle.js",
	},
	target: "web",
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.js|jsx$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					"plugins": [
						"transform-class-properties",
						"transform-object-rest-spread",
						"react-hot-loader/babel"
					]
				}
			},
			{
				test: /\.sass$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(["dist"])
	]
};

const serverConfig = {
	target: "node",
	node: {
		__dirname: true
	},
	plugins: [
		new CleanWebpackPlugin(["dist"])
	],
	externals: [nodeExternals()]
};

module.exports = { clientConfig, serverConfig };