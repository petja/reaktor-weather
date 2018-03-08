const ONE_DAY = 86400000

exports.seed = function(knex, Promise) {
    return knex('observations').del()
        .then(() => {
            return knex('cities').del()
        })
        .then(() => {
            return knex('cities').insert([
                {id: 'TOK', name: 'Tokyo'},
                {id: 'HKI', name: 'Helsinki'},
                {id: 'NYC', name: 'New York'},
                {id: 'AMS', name: 'Amsterdam'},
                {id: 'DUB', name: 'Dubai'},
            ]);
        })
        .then(() => {
            const dummyData = []
            const cities = ['TOK', 'HKI', 'NYC', 'AMS', 'DUB']

            for(i=0; i<250; i++) {
                const city = cities[Math.floor(Math.random() * cities.length)]
                const temperature = Math.round(Math.random() * 25 - 20)
                const timestamp = new Date(Date.now() - Math.random() * ONE_DAY * 60)

                dummyData.push({
                    city,
                    temperature,
                    timestamp,
                })
            }

            return knex('observations').insert(dummyData);
        });
};
