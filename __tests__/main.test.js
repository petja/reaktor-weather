const knex = require('../back/dist/model/db');

const iconv = require('iconv-lite');
iconv.encodings = require('iconv-lite/encodings');

test('database migration successful', () => {
    return knex.migrate.latest().then(() => knex.destroy());
});
