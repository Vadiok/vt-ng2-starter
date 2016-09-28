// Warning if ts.treatImports config is set to true!!!
// You need to add "ts-loader" to "package.json" and install it locally
// (or make local link to this package: npm i ts-loader -g; npm i ts-loader --link)

var gulp       = require("gulp");

var del        = require("del");
var gulpIf     = require("gulp-if");
var rename     = require("gulp-rename");
var sourceMaps = require("gulp-sourcemaps");
var uglify     = require("gulp-uglify");
var webpack    = require("webpack-stream");

var tsc        = require('gulp-tsc');


var helper = require("./common");


var compile = function() {
	var sourceFileName = helper.cfg("ts.mainFile", "main");
	var sourceFile = helper.dir.source(helper.cfg("ts.sourceDir", "script")) + sourceFileName + ".ts";
	var tsConfigFile = helper.dir.source(helper.cfg("ts.sourceDir", "script")) + "tsconfig.json";
	var resultFileName = helper.cfg("js.fileName", "main");
	var resultDir = helper.dir.build(helper.cfg("js.buildDir", "js"));
	var treatImports = helper.cfg("ts.treatImports", false);
	gulp
		.src(sourceFile)
		.pipe(gulpIf(treatImports, webpack({
			resolve: {extensions: ["", ".js", ".ts", ".tsx"]},
			module: {loaders: [{test: /\.tsx?$/, loader: "ts-loader", exclude: "node_modules"}]},
			ts: {configFileName: tsConfigFile}
		})))
		.pipe(gulpIf(treatImports, rename(resultFileName + ".js")))
		.pipe(gulpIf(!treatImports, tsc({
			sourcemap: true,
			out: resultFileName + ".js",
			module: "system", // amd, system
			target: "es3",    // es3 (default), es5, es6
			emitError: false
		})))
		.pipe(gulp.dest(resultDir))
		.on('end', function() {
			gulp
				.src(resultDir + "/" + resultFileName + ".js")
				.pipe(sourceMaps.init())
				.pipe(uglify())
				.pipe(rename(resultFileName + ".min.js"))
				.pipe(sourceMaps.write(helper.cfg("ts.sourceMapDir", ".")))
				.pipe(gulp.dest(resultDir));
		});
};
gulp.task(helper.cfg("ts.tasks.compile", "ts"), compile);

var clean = function() {
	var buildDir = helper.dir.build(helper.cfg("js.buildDir", "js"));
	var fileName = buildDir + "/" + helper.cfg("js.fileName", "main");
	var files = [
		fileName + ".js",
		fileName + ".min.js",
		fileName + ".js.map",
		fileName + ".min.js.map"
	];
	del(files).then(function(paths) {
		console.log("Deleted files:\n", paths.join("\n"));
	});
};
gulp.task(helper.cfg("ts.tasks.clean", "ts:clean"), clean);

var watch = function() {
	var files = helper.dir.source(helper.cfg("ts.sourceDir", "script")) + "*.ts";
	console.log(helper.cfg("ts.tasks.watch", "ts:watch") + " :: watching " + files);
	return gulp.watch([files], [helper.cfg("ts.tasks.compile", "ts")]);
};
gulp.task(helper.cfg("ts.tasks.watch", "ts:watch"), watch);
