// Test.js
// =======
// These are basic smoke tests and
// tests that don't quite fit into
// any one category. They're not random
// but I wouldn't be offended if you
// thought they were.

'use strict';

var chai    = require('chai'),
    request = require('supertest');

describe('Loading app server', function() {
  var server;

  // Create a new instance of the server for each test
  beforeEach(function() {
    delete require.cache[require.resolve(__dirname + '/../server/app')];
    server = require(__dirname + '/../server/app');
  });

  // Close the connection after each test
  afterEach(function(done) {
    server.close(done);
  });

  // Test homepage requests
  it('responds to \'/\' with a 404 error', function(done) {
    request(server)
      .get('/')
      .expect(404, done);
  });

  // Ensure non-existent pages return 404s
  it('responds with a 404 error on any missing page', function(done) {
    request(server)
      .get('/whatever')
      .expect(404, done);
  });
});
