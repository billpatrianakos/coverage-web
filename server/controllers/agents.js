// Agents Controller
// =================
// Responsible for routing and
// business logic for agent signup.

'use strict';

var express         = require('express'),
    AgentController = express.Router(),
    Agent           = require(__dirname + '/../models/agent');


// RESTful Route /
AgentController.route('/?')
  // GET /
  // -----
  // Render all agents
  .get(function(req, res, next) {
    //
  });

module.exports = AgentController;
