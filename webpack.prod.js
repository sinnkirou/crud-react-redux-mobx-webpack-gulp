const merge = require("webpack-merge");
const path = require("path");
const src = path.join(__dirname, "src");
const common = require("./webpack.common.js");
const webpack = require("webpack");

const production = {
	clientConfig: {
		mode: "production",
		devtool: "source-map",
		entry: {
			client: [ path.join(src, "client.js")]
		},
		plugins: [
			new webpack.HashedModuleIdsPlugin()
		]
	},
	serverConfig: {
		mode: "production",
		devtool: "source-map",
	}
};

module.exports = merge.multiple(common, production);