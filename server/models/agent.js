// Agent Model
// ===========
// Defines the Agent resource
// and its relationships

'use strict';

var Bookshelf = require('./database');

require('./subscriber');

var Agent = Bookshelf.Model.extend({
  tableName: 'agents',
  hasTimestamps: true,
  leads: function() {
    this.hasMany('Subscriber');
  }
});

module.exports = Bookshelf.model('Agent', Agent);
