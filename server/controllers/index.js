// Router setup
// ============
// Requires all route files with
// a list of exceptions

'use strict';

var _         = require('lodash'),
    fs        = require('fs'),
    excluded  = ['index'];

module.exports = function(app) {
  fs.readdirSync(__dirname).forEach(function(file) {
    // Remove extension from file name
    var basename = file.split('.')[0];

    // Only load files that aren't directories and aren't blacklisted
    if (!fs.lstatSync(__dirname + '/' + file).isDirectory() && !_.includes(excluded, file)) {
      app.use('/' + basename, require('./' + file));
    }
  });
};
