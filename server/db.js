const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "!!Plumbie6158!!",
    host: "localhost",
    port: 5432,
    database: "gymapp"
});

module.exports = pool;