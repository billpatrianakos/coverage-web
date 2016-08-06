// Favorite Model
// ==============
// Create an instance of a favorite

'use strict';

var Bookshelf = require('./database');

require('./user');

var Favorite = Bookshelf.Model.extend({
  tableName: 'favorites',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = Bookshelf.model('Favorite', Favorite);
