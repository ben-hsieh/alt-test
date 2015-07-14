// var path = require("path");
var config = require("./webpack.common.config.js");
var webpack = require("webpack");

config.entry.push(
	"webpack-dev-server/client?http://localhost:4000",
	"webpack/hot/dev-server"
);

config.output = {
	filename: "express-bundle.js",
	path: __dirname
};

config.plugins = [
	new webpack.HotModuleReplacementPlugin()
];

config.devTool = "eval-source-map";

config.module.loaders.push(
	{test: /\.jsx?$/, loaders: ["react-hot", "babel"], exclude: /node_modules/},
	{test: /\.css$/, loader: "style!css"},
	{
		test: /\.scss$/,
		loader: "style!css!sass?outputStyle=expanded"
	}
);

module.exports = config;
