const path = require("path");

const clientConfig = {
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
		publicPath: "/dist/",
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
	}
};

module.exports = clientConfig;