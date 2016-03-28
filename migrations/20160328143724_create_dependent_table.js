// Create dependents table
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('dependents', function(table) {
      table.increments();
      table.string('type');
      table.date('dob');
      table.string('first_name');
      table.string('last_name');
      table.string('middle_name');
      table.boolean('tobacco_use');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('dependents')
  ]);
};
