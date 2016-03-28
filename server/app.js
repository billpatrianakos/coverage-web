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
    config  = _.merge(require(__dirname + '/config/app').common, require(__dirname + '/config/app')[process.env.NODE_ENV]);


// App configuration
// -----------------
// Configure views and other settings
app.set('hbs', exphbs(config.handlebars));
app.set('view engine', 'hbs');

    
// Middleware
// ----------
// Insert, configure, update middleware


// Routes
// ------
// Initialize user facing routes
require('./controllers')(app);


// Start server
// ------------
// Start the server
let server = app.listen(process.env.PORT, () => {
  console.log('Started app on localhost:' + server.address().port);
});
