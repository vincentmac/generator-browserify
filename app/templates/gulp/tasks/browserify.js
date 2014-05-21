'use strict';

var browserify = require('browserify');
var config = require('../config');
var gulp = require('gulp');
// var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');

var libs = [
  'jquery',
  'lodash',
  'backbone'
];

// Vendor
gulp.task('vendor', function() {

  return browserify()
    .require('jquery')
    .require('lodash', {expose: 'underscore'})
    .require('backbone')
    .bundle({debug: true})
    .pipe(source('vendor.js'))
    .pipe(gulp.dest(config.dist + '/scripts/'));
});

// Browserify
gulp.task('browserify', function() {
  return browserify('./app/scripts/main.js')
    .external(libs)
    .bundle({debug: true})
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.dist + '/scripts/'));
});
