
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('agents', function(table) {
      table.increments();
      table.string('email');
      table.string('password');
      table.string('npn');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('agents')
  ]);
};
