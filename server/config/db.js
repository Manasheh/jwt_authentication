const dotenv = require('dotenv')
const knex = require('knex')
dotenv.config()

const { PGHOST, PGPORT, PGUSER, PGDATABASE, PGPASSWORD } = process.env

const db = knex({
    client: 'pg',
    connection: {
        host: PGHOST,
        port: PGPORT,
        user: PGUSER,
        database: PGDATABASE,
        password: PGPASSWORD,
        ssl: {rejectUnauthorized: false}
    }
})

module.exports = { db }
