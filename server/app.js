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
app.engine('hbs', exphbs(config.handlebars));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

    
// Middleware
// ----------
// Insert, configure, update middleware
if (_.includes(['development', 'test'], process.env.NODE_ENV)) {
  // DEVELOPMENT/TEST MIDDLEWARE
  app.use(express.static(__dirname + '/public'));
}


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

// Exporting the server as a module
// allows for easier testing
module.exports = server;
