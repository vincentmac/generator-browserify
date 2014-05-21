'use strict';

var config = require('../config');
var gulp = require('gulp');
var csso = require('gulp-csso');
// var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var size = require('gulp-size');

// Styles
gulp.task('styles', function () {
  // See https://github.com/andrew/node-sass for more options
  return gulp.src('app/scss/app.scss')
    .pipe(sass({
      outputStyle: 'nested',
      includePaths: [config.bower + '/foundation/scss'],
      sourceComments: 'map'
    }))
    // .pipe(prefix('last 1 version'))  // add vendor prefixes if necessary
    // .pipe(csso())  // minify css
    .pipe(gulp.dest(config.dist + '/styles'))
    .pipe(size());
});

// Styles Dist
gulp.task('stylesDist', function () {
  // See https://github.com/andrew/node-sass for more options
  return gulp.src('app/scss/app.scss')
    .pipe(sass({
      // outputStyle: 'compressed',
      includePaths: [config.bower + '/foundation/scss']
    }))
    // .pipe(prefix('last 1 version'))  // add vendor prefixes if necessary
    .pipe(csso())  // minify css
    .pipe(gulp.dest(config.dist + '/styles'))
    .pipe(size());
});
