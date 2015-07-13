var path = require("path");

var config = {
	context: __dirname,
	entry: ["./assets/javascripts/index"],

	resolve: {
		root: [
			path.join(__dirname, "scripts"),
			path.join(__dirname, "assets/javascripts"),
			path.join(__dirname, "assets/stylesheets")
		],

		/**
		 * 可忽略的檔案
		 */
		extensions: [
			"",
			".webpack.js",
			".web.js",
			".js",
			".jsx",
			".scss",
			".css",
			"config.js"
		]
	},
	/**
	 * 因為繼承它的檔案會用到，所以先定義...
	 */
	module: {
		loaders: []
	}
};

module.exports = config;
