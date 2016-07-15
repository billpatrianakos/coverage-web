// Login Controller
// ================
// Handles routing for logging into the pp

'use strict';

let express           = require('express'),
    QuotesController  = express.Router(),
    QClient           = require('q-client'),
    quotes            = new QClient(process.env.QClientID, process.env.QClientSecret);

    console.log(process.env.QClientID, process.env.QClientSecret);

QuotesController.route('/?')
  // GET /quotes/
  // ------------
  // Render quoting page
  .get(function(req, res, next) {
    console.log('Hello?');
    res.render('quotes/index', {
      csrf: req.csrfToken()
    });
  })
  // POST /quotes/
  // ------------
  // Gets quotes
  .post(function(req, res, next) {
    console.log('Hello?');
    quotes.getSubsidy('none', req.body.zip_code, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.json({status: 'error', message: 'There was an error fetching quotes', details: err});
      }
      else {
        console.log(results);
        res.json(JSON.parse(results));
      }
    });
  });

module.exports = QuotesController;
