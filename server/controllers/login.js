// Login Controller
// ================
// Handles routing for logging into the pp

'use strict';

let express         = require('express'),
    LoginController = express.Router();

LoginController.route('/?')
  // GET /login/
  // -----------
  // Render login page
  .get(function(req, res, next) {
    res.render('authentication/login', {
      csrf: req.csrfToken()
    });
  })
  // POST /login/
  // ------------
  // Logs the user in
  .post(function(req, res, next) {
    res.json({status: 'Logged in'});
  });

module.exports = LoginController;
