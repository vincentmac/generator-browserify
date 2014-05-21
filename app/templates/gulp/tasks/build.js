'use strict';

var gulp = require('gulp');

// Build
<% if (jade) { %>gulp.task('build', ['jade', 'styles', 'scripts', 'images']);<% } if (!jade) { %>
gulp.task('build', ['html', 'styles', 'scripts', 'images']);<% } %>
