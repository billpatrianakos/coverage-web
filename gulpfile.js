// Gulpfile
// ========
// Tasks for building, running, and
// deploying the app go in here.

'use strict'

// Set the environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// Require dependencies
let gulp        = require('gulp'),
    gls         = require('gulp-live-server'),
    fs          = require('fs'),
    _           = require('lodash'),
    config      = _.merge(require('./server/config/app').common, require('./server/config/app')[process.env.NODE_ENV]),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    less        = require('gulp-less'),
    browserify  = require('browserify'),
    uglify      = require('gulp-uglify'),
    tap         = require('gulp-tap'),
    buffer      = require('gulp-buffer'),
    gutil       = require('gulp-util'),
    todo        = require('gulp-todo');


// We'll use this to source our development
// shell scripts
const exec  = require('child_process').exec;

// Set environment variables before gulp starts
gulp.task('setvars', function() {
  exec('source ./envvars.sh', function(err, stdout, stderr) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(stdout);
    }
  });
});


// Bundle JS using Browserify
gulp.task('browserify', () => {
  browserify('./server/public/js/scripts.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(fs.createWriteStream('./server/public/js/scripts.min.js'));
});


// Compile all JSX files
gulp.task('react', function() {
  return gulp.src('./server/public/jsx/**/*.js', {read: false})
    .pipe(tap(function(file) {
      gutil.log('bundling ' + file.path);

      file.contents = browserify(file.path).transform('babelify', {presets: ['es2015', 'react']}).bundle()
    }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./server/public/js/components'));
});


// Run a local server
gulp.task('server', () => {
  let server = gls('./server/app.js', { env: config });
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
  gulp.watch(['./server/{config,controllers,models,middleware}/**/*.js', './server/app.js', './test/**/*.js'], ['jshint']);
  gulp.watch(['./server/public/less/**/*.less'], ['less']);
  gulp.watch(['./server/public/js/**/*.js', '!./server/public/vendor/**/*.js'], ['browserify']);
  gulp.watch(['./server/public/jsx/*.js'], ['react']);
});


// Warn about TODOs and FIXMEs in our code
gulp.task('todo', function() {
  gulp.src(['./gulpfile.js', './server/{config,controllers,models,middleware,lib}/**/*'])
    .pipe(todo())
    .pipe(gulp.dest('./'));
});


// Default task
gulp.task('default', ['setvars', 'watch', 'server']);
