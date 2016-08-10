// Signup Page
// ===========
// Scripts responsible
// for the signup page

'use strict';

// Require dependencies
let validate          = require('validate.js'),
    signupConstraints = {
      email: {
        email: {
          message: 'You must enter a valid email address.'
        }
      },
      password: {
        length: {
          minimum: 6,
          tooShort: 'Your password needs to be at least 6 characters long.'
        }
      },
      password_confirmation: {
        equality: {
          attribute: 'password',
          message: 'The password and confirmation do not match'
        }
      }
    };

$('input[name="user-type"]').click(function() {
  $('.user-type').toggle();

  if ($(this).val() === 'consumer') $('#user-form').toggle();
  if ($(this).val() === 'agent')    $('#agent-form').toggle();
});


// Validate the signup form
$('#user-form form').submit(function(e) {
  e.preventDefault();

  var inputs = {
    email:                  $('input[name="email"]').val(),
    password:               $('input[name="password"]').val(),
    password_confirmation:  $('input[name="password_confirmation"]').val()
  };

  var validationErrors = validate(inputs, signupConstraints);

  if (!validationErrors) {
    $(this).submit();
  } else {
    console.log(validationErrors)
  }
});
