'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');

// Build
gulp.task('build', [<% if (jade) { %>'jade'<% } if (!jade) { %>'html'<% } %>, 'styles', 'vendor', 'browserify', 'images'], function() {

});
