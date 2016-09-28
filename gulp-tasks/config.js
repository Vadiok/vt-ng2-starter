var config = {};

// Source and Result dirs
config.common = {
	sourceDir: "source",
	buildDir: "dist"
};

// JavaScript result subdir and filename
config.js = {
	buildDir: "js",
	fileName: "script"
};

// Template result subdir and extension
config.tpl = {
	buildDir:  ".",
	extension: "html"
};

// TypeScript config
config.ts = {
	tasks: {
		compile: "ts",
		clean:   "ts:clean",
		watch:   "ts:watch"
	},
	sourceDir:    "script",
	mainFile:     "main",
	treatImports: 1,            // 1 to use webpack bundle which adds additional functions to result file, 0 for use gulp-tsc
	outputStyle:  "compressed", // nested, expanded, compact, compressed (uses only if !treatImports)
	sourceMapDir: "."           // "." - same dir as file, false - sourcemaps places into file (uses only if !treatImports)
};

// Pug config
config.pug = {
	tasks: {
		compile: "pug",
		clean:   "pug:clean",
		watch:   "pug:watch"
	},
	sourceDir:  "tpl",
	fileString: "*.pug", // For any subfolders use **/*.pug
	options:    {} // https://github.com/pugjs/pug#options
};

module.exports = config;