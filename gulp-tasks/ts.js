// Warning if ts.treatImports config is set to true!!!
// You need to add "ts-loader" to "package.json" and install it locally
// (or make local link to this package: npm i ts-loader -g; npm i ts-loader --link)

var gulp       = require("gulp");

var helper = require("./common");
var taskFunctions = require("./functions/ts");

var sourceFileName = helper.cfg("ts.mainFile", "main");
var sourceDir = helper.dir.source(helper.cfg("ts.sourceDir", "script"));
var sourceFile = sourceDir + sourceFileName + ".ts";
var resultDir = helper.dir.build(helper.cfg("js.buildDir", "js"));
var resultFileName = helper.cfg("js.fileName", "main");

var compileWithCompression = function () {
	taskFunctions.compile(sourceFile, resultDir, {resultFileName: resultFileName, useCompression: true});
};
var compileWithoutCompression = function () {
	taskFunctions.compile(sourceFile, resultDir, {resultFileName: resultFileName, useCompression: false});
};
gulp.task(helper.cfg("ts.tasks.compile", "ts"), compileWithCompression);
gulp.task(helper.cfg("ts.tasks.compileNonMinified", "ts:unc"), compileWithoutCompression);

var clean = function() {
	taskFunctions.clean(resultDir, resultFileName);
};
gulp.task(helper.cfg("ts.tasks.clean", "ts:clean"), clean);

var watchWithCompression = function () {
	taskFunctions.watch(sourceDir, helper.cfg("ts.tasks.compile", "ts"));
};
var watchWithoutCompression = function () {
	taskFunctions.watch(sourceDir, helper.cfg("ts.tasks.compileNonMinified", "ts:unc"));
};
gulp.task(helper.cfg("ts.tasks.watch", "ts:watch"), watchWithCompression);
gulp.task(helper.cfg("ts.tasks.watchNonMinified", "ts:unc:watch"), watchWithoutCompression);
