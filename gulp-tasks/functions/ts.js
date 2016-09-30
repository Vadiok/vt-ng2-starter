var gulp       = require("gulp");

var del        = require("del");
var gulpIf     = require("gulp-if");
var rename     = require("gulp-rename");
var sourceMaps = require("gulp-sourcemaps");
var uglify     = require("gulp-uglify");
var webpack    = require("webpack-stream");

var tsc        = require('gulp-tsc');


var helper = require("./../common");

var compile = function(sourceFile, resultDir, userOptions) {
	var defaultOptions = {
		tsConfigFile: "./script/tsconfig.json",
		resultFileName: "main",
		treatImports: true,
		useCompression: true
	};
	var options = helper.mergeOptions(userOptions, defaultOptions);
	gulp
		.src(sourceFile)
		.pipe(gulpIf(options.treatImports, webpack({
			resolve: {extensions: ["", ".js", ".ts", ".tsx"]},
			module: {loaders: [{test: /\.tsx?$/, loader: "ts-loader"}]},
			ts: {configFileName: options.tsConfigFile}
		})))
		.pipe(gulpIf(options.treatImports, rename(options.resultFileName + ".js")))
		.pipe(gulpIf(!options.treatImports, tsc({
			sourcemap: true,
			out: options.resultFileName + ".js",
			module: "system", // amd, system
			target: "es3",    // es3 (default), es5, es6
			emitError: false
		})))
		.pipe(gulp.dest(resultDir))
		.on('end', function() {
			gulp
				.src(resultDir + "/" + options.resultFileName + ".js")
				.pipe(sourceMaps.init())
				.pipe(gulpIf(options.useCompression, uglify()))
				.pipe(rename(options.resultFileName + ".min.js"))
				.pipe(sourceMaps.write(helper.cfg("ts.sourceMapDir", ".")))
				.pipe(gulp.dest(resultDir));
		});
};

var clean = function(buildDir, fileName) {
	var fileNameWithPath = buildDir + "/" + fileName;
	var files = [
		fileNameWithPath + ".js",
		fileNameWithPath + ".min.js",
		fileNameWithPath + ".js.map",
		fileNameWithPath + ".min.js.map"
	];
	del(files).then(function(paths) {
		console.log("Deleted files:\n", paths.join("\n"));
	});
};

var watch = function(watchDir, taskName) {
	var files = watchDir + "**/*.ts";
	console.log(taskName + " :: watching " + files);
	return gulp.watch([files], [taskName]);
};

module.exports = {
	compile: compile,
	clean: clean,
	watch: watch
};