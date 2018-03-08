exports.up = function(knex, Promise) {
    return knex.schema.createTable('cities', function(t) {
        t.string('id', 8).primary();
        t.string('name', 16);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cities') 
};
