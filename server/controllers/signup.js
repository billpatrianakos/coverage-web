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
      csrf: req.csrfToken(),
      scripts: ['/js/signup.min.js']
    });
  })
  // POST /signup/
  // ------------
  // Registers a new user
  .post(function(req, res, next) {
    // Check if user exists in database
    User.where({ email: req.body.email })
      .fetchAll()
      .then(function(user) {
        if (user) {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err) return next(new Error('Could not hash password'));

            // Create a new user
            new User({
              email:    req.body.email,
              password: hash
            })
            .save()
            .then(function(user) {
              res.send('User created');
            })
            .catch(function(err) {
              res.send('username or email already taken');
            });
          });
        } else {
          res.send('could not create new user');
        }
      })
      .catch(function(err) {
        console.log(err, 'FETCH ERROR');
        res.send('Could not run fetch query');
      });
  });

module.exports = SignupController;
