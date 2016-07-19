// SignupController
// ================
// Handles routing for signing up for the pp

'use strict';

let express           = require('express'),
    SignupController  = express.Router(),
    bcrypt            = require('bcrypt'),
    User              = require(__dirname + '/../models/user');

SignupController.route('/?')
  // GET /signup/
  // -----------
  // Render login page
  .get(function(req, res, next) {
    res.render('authentication/signup', {
      csrf: req.csrfToken()
    });
  })
  // POST /signup/
  // ------------
  // Logs the user in
  .post(function(req, res, next) {
    // bcrypt.
  });

module.exports = SignupController;
