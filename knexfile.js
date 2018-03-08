module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host : '127.0.0.1',
            user : 'reaktor',
            password : 'QcPLP2qMqQx6FGafU5cmGVB6eZQ2IKjtMz0XfrkU',
            database : 'reaktor'
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
