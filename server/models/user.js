// User Model
// ==========
// Create a user model class

'use strict';

var Bookshelf = require('./database');

require('./favorite');
require('./subscriber');

var User = Bookshelf.Model.extend({
  tableName: 'users',
  favorites: function() {
    return this.hasMany('Favorite');
  },
  profile: function() {
    return this.hasOne('Subscriber');
  }
});

module.exports = Bookshelf.model('User', User);
