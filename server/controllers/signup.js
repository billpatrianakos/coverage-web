// SignupController
// ================
// Handles routing for signing up for the pp

'use strict';

let express           = require('express'),
    SignupController  = express.Router();

SignupController.route('/?')
  // GET /signup/
  // -----------
  // Render login page
  .get(function(req, res, next) {
    res.json({status: 'signup page'});
  })
  // POST /signup/
  // ------------
  // Logs the user in
  .post(function(req, res, next) {
    res.json({status: 'Logged in'});
  });

module.exports = SignupController;
