// User Model
// ==========
// Create a user model class

'use strict';

var Bookshelf = require('./database');

require('./favorite');

var User = Bookshelf.model.extend({
  tableName: 'users',
  favorites: function() {
    return this.hasMany('Favorite');
  }
});

module.exports = Bookshelf.model('User', User);
