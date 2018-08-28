const merge = require("webpack-merge");
const path = require("path");
const src = path.join(__dirname, "src");
const common = require("./webpack.common.js");

const production = {
	clientConfig: {
		mode: "production",
		devtool: "source-map",
		entry: {
			client: ["babel-polyfill", path.join(src, "client.js")]
		}
	},
	serverConfig: {
		mode: "production",
		devtool: "source-map",
	}
};

module.exports = merge.multiple(common, production);