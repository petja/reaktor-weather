const knex = require('./db')

// Derivated and inspired by:
// https://medium.com/dailyjs/ec579cafbfc7
Array.prototype.toObj = function(key, fn) {
    return this.reduce((obj, item) => {
        obj[item[key]] = fn ? fn(item) : item
        return obj
    }, {})
}

const ITEMS_PER_PAGE = 10

function getList(cities, page) {
    return knex.select()
        .from('observations')
        .whereIn('city', cities)
        .orderBy('timestamp', 'asc')
        .limit(ITEMS_PER_PAGE)
        .offset(ITEMS_PER_PAGE * page)
        .then(rows => {
            return rows.toObj('id')
        })
}

function getSummary() {
    // Get latest temperature of each city
    // LEFT JOIN ensures also cities with no data will be returned
    const latest = knex.select()
        .from('cities')
        .column([
            'cities.id AS city',
            'cities.name AS name',
            'timestamp',
            'temperature',
        ])
        .leftJoin('observations', 'observations.city', 'cities.id')
        .whereIn('timestamp', function() {
            this.select()
                .from('observations')
                .max('timestamp')
                .groupBy('city')
        })
        .orWhereNull('timestamp')

    // Get min and max temperatures of each city
    const minMax = knex.select()
        .from('observations')
        .column([
            'city',
        ])
        .min('temperature as min')
        .max('temperature as max')
        .whereRaw('timestamp > DATE_SUB(NOW(), INTERVAL 1 DAY)')
        .groupBy('city')

    // Run queries
    return Promise.all([
        latest,
        minMax,
    ]).then(resp => {
        console.log(resp[0])
        // Convert array to object, so `city` is the key
        const minMaxByCity = resp[1].toObj('city')

        const cityData = resp[0].toObj('city', item => {
            const {min, max} = minMaxByCity[item.city] || {min: null, max: null}

            return {
                name        : item.name,
                latest      : item.temperature,
                latestAt    : Date.parse(item.timestamp),
                min24       : min,
                max24       : max,
            }
        })

        return cityData
    }).catch(err => {
        console.error(err)
    })
}

module.exports = {
    getSummary,
    getList,
}
