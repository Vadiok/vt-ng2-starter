// Helper

var config = require("./config");

// Returns config parameter or default value if parameter is not assigned
var cfg = function(parameter, defaultValue) {
	var paramPath = parameter.split(".");
	var result = config;
	var key;
	for (var i=0; i<paramPath.length; i++) {
		key = paramPath[i];
		if (typeof result[key] === "undefined") {
			result = defaultValue;
			break;
		}
		result = result[key];
	}
	return result;
};

var dirMaker = {
	dir: function(path) {
		// removes beginning "./" or "/"
		function preparePathPart(path) {
			return path.replace(/^(\.?\/)*(.*)$/, "$2");
		}
		var result = "./" + preparePathPart(path) + "/";
		result = result.replace(/\/\.\//g,"/");
		result = result.replace(/\/+/g,"/");
		return result;
	},
	source: function(path) { return this.dir(cfg("common.sourceDir", "source") + "/" + path); },
	build: function(path) { return this.dir(cfg("common.buildDir", "dist") + "/" + path); }
};

var mergeOptions = function (options, defaultOptions) {
	var optionValue = function(key, defaultValue) {
		if (typeof options === "object" && typeof options[key] !== "undefined") {
			return options[key];
		}
		return defaultValue;
	};
	var result = {};
	for (var key in defaultOptions) {
		if (defaultOptions.hasOwnProperty(key)) {
			result[key] = optionValue(key, defaultOptions[key]);
		}
	}
	return result;
};

module.exports = {
	cfg: cfg,
	dir: dirMaker,
	mergeOptions: mergeOptions
};