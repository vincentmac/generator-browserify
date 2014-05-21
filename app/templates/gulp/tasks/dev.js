'use strict';

var gulp = require('gulp');

// Dev Server
<% if (jade) { %>gulp.task('dev', ['jade', 'styles', 'vendor', 'browserify', 'images', 'watch']);<% } if (!jade) { %>
gulp.task('dev', ['html', 'styles', 'vendor', 'browserify', 'images', 'watch']);<% } %>
