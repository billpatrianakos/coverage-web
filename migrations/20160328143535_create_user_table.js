// Create users table
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('email').unique();
      table.string('password');
      table.timestamps();
    })
  ]);
};

// Delete the users table
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
