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
    },
    agentConstraints  = {
      //
    } 

$('input[name="user-type"]').click(function() {
  $('.user-type').toggle();

  if ($(this).val() === 'consumer') $('#user-form').toggle();
  if ($(this).val() === 'agent')    $('#agent-form').toggle();
});


// Validate the signup form
// ------------------------
// Grabs the most recent signup form data
$('#user-form form').submit(function(e) {
  e.preventDefault();

  // Run validate.js on the front-end
  var validationErrors = validate({
    email: $('input[name="email"]').val(),
    password:               $('input[name="password"]').val(),
    password_confirmation:  $('input[name="password_confirmation"]').val()
  }, signupConstraints);

  // Error displaying element
  var $validationMessages = $('#front-end-errors');

  // Check for validation errors and act accordingly
  if (!validationErrors) {
    console.log(validationErrors);
    $validationMessages.empty().hide();
  } else {
    validationErrors.forEach(function(error) {
      console.log(validationErrors);
      $validationMessages.toggle();

      $validationMessages.append('<div class="alert-box warning"><p>' + validationError + '</p></div>');
    });
  }
});










