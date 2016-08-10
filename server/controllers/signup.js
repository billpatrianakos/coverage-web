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
      warning: req.flash('warning') || null,
      scripts: ['/js/signup.min.js']
    });
  })
  // POST /signup/
  // ------------
  // Registers a new user
  .post(function(req, res, next) {
    // Do usual form validation
    if (req.body.password !== req.body.password_confirmation) {
      req.flash('warning', 'The passwords you entered do not match');
      res.redirect('/signup');
    } else {
      // Check if user exists in database
      User.where({ email: req.body.email })
        .fetch()
        .then(function(user) {
          if (user) {
            console.log(user);
            req.flash('warning', 'Username or email address already taken');
            console.log('Username or email already taken');
            res.redirect('/signup');
          } else {
            // Hash passwod if user doesn't exist
            bcrypt.hash(req.body.password, 10, function(err, hash) {
              if (err) return next(new Error('Unable to hash password'));

              new User({
                email:    req.body.email,
                password: hash
              }).save()
              .then(function(user) {
                console.log(user);
                res.send('New user created ' + user.get('email'));
              })
              .catch(function(err) {
                console.log(err);
                res.send('Could not create new user');
              });
            });
          }
        })
        .catch(function(err) {
          console.log(err, 'FETCH ERROR');
          res.send('Could not run fetch query');
        });
    }
  });

module.exports = SignupController;
