const knex = require('./db')

// Derivated and inspired by:
// https://medium.com/dailyjs/ec579cafbfc7
Array.prototype.toObj = function(key, fn) {
    return this.reduce((obj, item) => {
        obj[item[key]] = fn ? fn(item) : item
        return obj
    }, {})
}

const ITEMS_PER_PAGE = 20

function getCities() {
    return knex.select()
        .from('cities')
        .then(cities => {
            return cities.toObj('id', city => city.name)
        })
}

// Get paginated list of observations
function getList(cities: string[], page: number): object[] {
    return knex.select()
        .from('observations')
        .column([
            'observations.id',
            'cities.name as city',
            'temperature',
            'timestamp',
        ])
        .join('cities', 'cities.id', 'observations.city')
        .whereIn('city', cities)
        .orderBy('timestamp', 'desc')
        .limit(ITEMS_PER_PAGE)
        .offset(ITEMS_PER_PAGE * page)
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

// Min and max temperatures for each day
// within previous 14 day
function getChartData(cities: string[]) {
    const query = knex.select()
        .from('observations')
        .column(
            knex.raw('DATE(timestamp) as date')
        )
        .min('temperature as min')
        .max('temperature as max')
        .whereIn('city', cities)
        .whereRaw('DATE(timestamp) >= (CURDATE() - INTERVAL 14 DAY)')
        .groupBy('date')

    return query.then(resp => {
        // Format data so it's understandable
        // by the Recharts library
        return resp.map(result => {
            const date = new Date(result.date).toISOString().substr(5,5)

            return {
                date,
                temperature     : [
                    result.min,
                    result.max,
                ],
            }
        })
    })
}

type Details = {
    city            : string,
    temperature     : number,
}

function create(details): Promise {
    return getCities().then(cities => {
        if(!Object.keys(cities).includes(details.city)) throw new Error(`City doesn't exists`)
        if(details.temperature < -50 || details.temperature > 50) throw new Error(`Temperature out of range`)
    }).then(() => {
        return knex.insert({
            city            : details.city,
            temperature     : details.temperature,
        }).into('observations')
    })
}

module.exports = {
    create,
    getChartData,
    getSummary,
    getList,
    getCities,
}
