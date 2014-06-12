'use strict';

var gulp = require('gulp');

// Dev Server
gulp.task('dev', [<% if (jade) { %>'jade'<% } if (!jade) { %>'html'<% } %>, 'styles', 'vendor', 'browserify', 'images', 'watch']);
