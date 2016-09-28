var gulp   = require("gulp");

var del    = require("del");
var rename = require("gulp-rename");

var pug    = require("gulp-pug");


var helper = require("./common");


var compile = function() {
	var sourceFileNames = helper.cfg("pug.fileString", "**/*.pug");
	var sourceFiles = helper.dir.source(helper.cfg("pug.sourceDir", "style")) + sourceFileNames;
	var resultDir = helper.dir.build(helper.cfg("tpl.buildDir", "tpl"));
	gulp
		.src(sourceFiles)
		.pipe(pug(helper.cfg("pug.options", {})))
		.pipe(gulp.dest(resultDir));
};
gulp.task(helper.cfg("pug.tasks.compile", "pug"), compile);

var clean = function() {
	var buildDir = helper.dir.build(helper.cfg("tpl.buildDir", "tpl"));
	var files = [
		"**/*." + helper.cfg("tpl.extension")
	];
	del(files).then(function(paths) {
		console.log("Deleted files:\n", paths.join("\n"));
	});
};
gulp.task(helper.cfg("pug.tasks.clean", "pug:clean"), clean);

var watch = function() {
	var files = helper.dir.source(helper.cfg("pug.sourceDir", "tpl")) + "**/*.pug";
	console.log(helper.cfg("pug.tasks.watch", "pug:watch") + " :: watching " + files);
	return gulp.watch([files], [helper.cfg("pug.tasks.compile", "pug")]);
};
gulp.task(helper.cfg("pug.tasks.watch", "pug:watch"), watch);
