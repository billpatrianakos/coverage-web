// Gulpfile
// ========
// Tasks for building, running, and
// deploying the app go in here.

'use strict'

// Set the environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// Require dependencies
let gulp    = require('gulp'),
    gls     = require('gulp-live-server'),
    fs      = require('fs'),
    _       = require('lodash'),
    config  = _.merge(require('./server/config/app').common, require('./server/config/app')[process.env.NODE_ENV]),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    less    = require('gulp-less');


// Run a local server
gulp.task('server', () => {
  let server = gls('./server/app.js', {env: config});
  server.start();

  // Reload the server on change
  gulp.watch(['./gulpfile.js', './server/app.js', './server/{config,controllers,middleware,models}/**/*.js'], function() {
    server.start.bind(server)()
  });
});


// Lint JS files
gulp.task('jshint', function() {
  gulp.src(['./server/{config,controllers,models,middleware}/**/*.js', '!./server/public/vendor/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


// Compile LESS
gulp.task('less', function() {
  gulp.src('./server/public/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./server/public/css'));
});


// Watch for changes and run defined tasks
gulp.task('watch', function() {
  gulp.watch(['./server/{config,controllers,models,middleware}/**/*.js'], ['jshint']);
  gulp.watch(['./server/public/less/**/*.less'], ['less']);
  // gulp.watch(['./server/public/js/**/*.js', '!./server/public/vendor/**/*.js'], ['bundle'])
});


// Default task
gulp.task('default', ['server', 'watch']);
