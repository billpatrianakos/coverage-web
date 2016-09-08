// SignupController
// ================
// Handles routing for signing up for the pp

'use strict';

let express           = require('express'),
    SignupController  = express.Router(),
    Promises          = require('bluebird'), // Called Promises (plural) not to confuse with built in JS Promise keyword
    bcrypt            = Promises.promisifyAll(require('bcrypt')),
    User              = require(__dirname + '/../models/user');

SignupController.route('/?')
  // GET /signup/
  // -----------
  // Render login page
  .get(function(req, res, next) {
    res.render('authentication/signup', {
      csrf: req.csrfToken(),
      warning: req.flash('warning') || null,
      scripts: ['/js/signup.min.js']
    });
  })
  // POST /signup/
  // ------------
  // Registers a new user
  .post(function(req, res, next) {
    var body = req.body;

    if (body.password === body.password_confirmation) {
      bcrypt.hashAsync(body.password, 10)
        .then(function(hash) {
          console.log(hash, 'Your hash');
          return  hash;
        })
        .then(function(hash) {
          return new User({email: body.email, password: hash}).save();
        })
        .then(function(user) {
          res.send('You signed up');
        })
        .catch(function(err) {
          res.send('ERROR: ' + err);
        });
    } else {
      req.flash('warning', ['The passwords you entered do not match']);
      res.redirect('/signup');
    }
  });

module.exports = SignupController;
