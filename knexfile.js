module.exports = {

    development     : {
        client          : 'mysql2',

        connection      : {
            host            : process.env.DB_HOST || '127.0.0.1',
            user            : process.env.DB_USER || 'reaktor',
            password        : process.env.DB_PASSWORD || 'QcPLP2qMqQx6FGafU5cmGVB6eZQ2IKjtMz0XfrkU',
            database        : process.env.DB_DATABASE || 'weather',
            charset         : 'utf8',
        },

        migrations      : {
            tableName       : 'knex_migrations'
        }
    }

};
