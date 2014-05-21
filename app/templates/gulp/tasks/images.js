'use strict';

var gulp = require('gulp');
var cache = require('gulp-cache');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');

// Images
gulp.task('images', function() {
	var dest = '.tmp/images';

	return gulp.src('app/images/**/*')
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
		.pipe(gulp.dest(dest));
});


// Images Dist
gulp.task('imagesDist', function () {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe(size());
});
