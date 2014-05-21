'use strict';

var config = require('../config');
var gulp = require('gulp');
var jade = require('gulp-jade');
var size = require('gulp-size');

 // Jade
gulp.task('jade', function () {
  return gulp.src('app/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(config.dist))
    .pipe(size());
});
