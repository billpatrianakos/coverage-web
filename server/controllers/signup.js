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
    // 1. Check for password matching
    // 2. Check if user already exists
    // 3. Hash the password
    // 4. Create a new user

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




    // if (req.body.password === req.body.password_confirmation) {
    //   User.where({email: req.body.email}).fetch()
    //     .then(function(user) {
    //       if (user) {
    //         req.flash('warning', ['The username you chose has already been taken.']);
    //         return res.redirect('/signup');
    //       }
    //       else {
    //         return user;
    //       }
    //     })
    //     .then(function(user) {
    //       bcrypt.hash(req.body.password, 10, function(err, hash) {
    //         if (err) return next(new Error('Unable to generate password. ' + err));

    //         return new User({
    //           email: req.body.email,
    //           password: hash
    //         })
    //         .save()
    //         .then(function(user) {
    //           res.send('You signed up');
    //         })
    //         .catch(function(err) {
    //           req.flash('warning', ['There was an error creating your account.', err]);
    //           res.redirect('/signup');
    //         });
    //       });
    //     })
    //     .catch(function(error) {
    //       return next(new Error('Fatal error: ' + error));
    //     });
    // } else {
    //   req.flash('warning', ['The passwords you entered do not match']);
    //   res.redirect('/signup');
    // }
  });

module.exports = SignupController;
