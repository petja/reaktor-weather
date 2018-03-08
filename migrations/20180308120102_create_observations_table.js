exports.up = function(knex, Promise) {
    return knex.schema.createTable('observations', function(t) {
        t.increments('id').unsigned().primary();
        t.string('city', 8).references('cities.id');
        t.integer('temperature');
        t.timestamp('timestamp').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('observations') 
};
