'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');

// Clean
gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe(clean());
});
