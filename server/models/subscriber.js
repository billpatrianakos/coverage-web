// Subscriber Model
// ================
// Instantiate a new instance of
// an agent's leads or a user's profile.

'use strict';

var Bookshelf = require('./database');

require('./user');
require('./agent');

var Subscriber =  Bookshelf.Model.extend({
  tableName:'subscribers',
  users: function() {
    return this.belongsTo('User');
  },
  agents: function() {
    return this.belongsTo('Agent');
  }
});

module.exports = Bookshelf.model('Subscriber', Subscriber);
