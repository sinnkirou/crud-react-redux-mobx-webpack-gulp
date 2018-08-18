const path = require("path");
const src = path.join(__dirname, "src");
const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		client: ["babel-polyfill", "react-hot-loader/patch", path.join(src, "client.js"), "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
});