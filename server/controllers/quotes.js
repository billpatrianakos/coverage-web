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
  // -----------
  // Render quoting page
  .get(function(req, res, next) {
    res.render('quotes/index', {});
  })
  // POST /quotes/
  // ------------
  // Gets quotes
  .post(function(req, res, next) {
    quotes.getSubsidy('none', req.body.zip_code, req.body, function(err, results) {
      if (err) return next(new Error(err));
      res.json(JSON.parse(results));
    });
  });

module.exports = QuotesController;
