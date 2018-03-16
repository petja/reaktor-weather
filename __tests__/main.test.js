const knex = require('../back/dist/model/db');
const Observation = require('../back/dist/model/Observation');

const iconv = require('iconv-lite');
iconv.encodings = require('iconv-lite/encodings');

describe('Database', () => {
    test('run migrations', () => {
        return knex.migrate.latest();
    });

    test('fill with seed data', () => {
        return knex.seed.run();
    });
});

describe('Observation', () => {
    test(`.getList(['HKI'], 1) returns 20 observations`, () => {
        return expect(Observation.getList(['HKI'], 1)).resolves.toHaveLength(20);
    });
});

afterAll(() => {
    return knex.destroy();
});
