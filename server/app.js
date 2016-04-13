// Server startup script
// =====================
// Responsible for configuring the server,
// inserting middleware, and starting the
// app up. 
//
// Note: this was written on my iPhone, please excuse typos

'use strict'

let express = require('express'),
    exphbs  = require('express-handlebars'),
    app     = express(),
    _       = require('lodash'),
    config  = _.merge(require(__dirname + '/config/app').common, require(__dirname + '/config/app')[process.env.NODE_ENV]),
    morgan  = require('morgan');


// App configuration
// -----------------
// Configure views and other settings
app.engine('hbs', exphbs(config.handlebars));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

    
// Middleware
// ----------
// Insert, configure, update middleware
if (_.includes(['development', 'test'], process.env.NODE_ENV)) {
  // DEVELOPMENT/TEST MIDDLEWARE
  app.use(express.static(__dirname + '/public'));
  app.use(morgan('combined'));
} else {
  // PRODUCTION MIDDLEWARE
  app.use(morgan('combined', { skip: function(req, res) { return res.statusCode < 400; } }));
}


// Routes
// ------
// Initialize user facing routes
require('./controllers')(app);


// 404 Handler
// -----------
// Handle all 404 errors. Do not define any
// routes below this (except 500 error middleware)
app.use(function(req, res, next) {
  if (req.xhr)
    res.status(404).json({status: 'error', message: 'The URL and/or request method used did not match any valid URLs.'});
  else
    res.status(404).render('404', {error: 'Page not found'});
});


// Error handler
// -------------
// Handles all application errors and responds
// appropriately based on the type of request.
app.use(function(err, req, res, next) {
  if (req.xhr)
    res.status(500).json({status: 'error', message: 'The following internal server error was encountered: ' + err});
  else
    res.status(500).render('500', {error: err});
});


// Start server
// ------------
// Start the server
let server = app.listen(process.env.PORT, () => {
  console.log('Started app on localhost:' + server.address().port);
});

// Exporting the server as a module
// allows for easier testing
module.exports = server;
