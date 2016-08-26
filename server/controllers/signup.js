// SignupController
// ================
// Handles routing for signing up for the pp

'use strict';

let express           = require('express'),
    SignupController  = express.Router(),
    Promise           = require('bluebird'),
    bcrypt            = Promise.promisifyAll(require('bcrypt')),
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
    if (req.body.password === req.body.password_confirmation) {
      User.where({email: req.body.email}).fetch()
        .then(function(user) {
          if (user)
            res.redirect('/login');
          else
            return user;
        })
        .then(function(user) {
          return bcrypt.hash(req.body.password, 10);
        })
        .then(function(hash) {
          return new User({
            email: req.body.email,
            password: hash
          }).save();
        })
        .then(function(user) {
          res.send('You have signed up');
        })
        .catch(function(error) {
          return next(new Error('Fatal error: ' + error));
        });
    } else {
      req.flash('warning', 'The passwords you entered do not match');
      res.redirect('/signup');
    }
  });

module.exports = SignupController;
