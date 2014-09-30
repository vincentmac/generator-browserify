'use strict';

// var config = require('../config.js');
var gulp = require('gulp');
var livereload = require('gulp-livereload');

// Watch
gulp.task('watch', ['connect', 'serve'], function () {
  var server = livereload();
    // Watch for changes in `app` folder
    gulp.watch([
        // 'app/jade/**/*.jade',
        // 'app/*.html',
        // 'app/scss/**/*.scss',
        // 'app/scripts/**/*.js',
        // 'app/images/**/*',
        '.tmp/**/*'
    ]).on('change', function(file) {
      server.changed(file.path);
    });

    <% if (libsass) { %>// Watch .scss files
    gulp.watch('app/scss/**/*.scss', ['styles']);<% } if (bootstrap) { %>// Watch .less files
    gulp.watch('app/less/**/*.less', ['styles']);<% } %>

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['browserify']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

    <% if (jade) { %>// Watch .jade files
    // Watch .jade files
    gulp.watch('app/jade/**/*.jade', ['jade']);<% } if (!jade) { %>// Watch .html files
+    gulp.watch('app/**/*.html', ['html']);<% } %>
});
