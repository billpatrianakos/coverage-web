// Favorite Model
// ==============
// Create an instance of a favorite

'use strict';

var Bookshelf = require('./database');

var Favorite = Bookshelf.Model.extend({
  tableName: 'favorites',
  users: function() {
    return this.belongsTo('User');
  }
});

module.exports = Bookshelf.model('Favorite', Favorite);
