'use strict';

var config = require('../config');
var gulp = require('gulp');
var csso = require('gulp-csso');
var less = require('gulp-less');
// var prefix = require('gulp-autoprefixer');
var size = require('gulp-size');

// Styles
gulp.task('styles', function () {
  return gulp.src('app/less/app.less')
    // Leaving out recess support due to string interpolation missing in less v1.3 (which recess is dependent on)
    // .pipe(recess())
    .pipe(less({
      style: 'expanded',
      loadPath: [config.bower]
    }))
    // .pipe(prefix('last 1 version'))
    .pipe(csso())
    .pipe(gulp.dest(config.dist + '/styles'))
    .pipe(size());
});
