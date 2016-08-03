// Create subscribers table
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('subscribers', function(table) {
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.string('middle_name');
      table.float('household_income');
      table.date('dob');
      table.boolean('tobacco_use');
      table.string('phone_number');
      table.integer('zip_code');
      table.boolean('is_free_agent');
      table.integer('user_id').references('id').inTable('users');
      table.integer('agent_id').references('id').inTable('agents');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('subscribers')
  ]);
};
