const merge = require("webpack-merge");
const path = require("path");
const src = path.join(__dirname, "src");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",
	entry: {
		client: [path.join(src, "client.js")]
	}
});