// Signup Page
// ===========
// Scripts responsible
// for the signup page

$('input[name="user-type"]').click(function() {
  $('.user-type').toggle();

  if ($(this).val() === 'consumer') $('#user-form').toggle();
  if ($(this).val() === 'agent')    $('#agent-form').toggle();
});
