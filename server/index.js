const { Pool } = require('pg');

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atelier',
  password: 'postgres',
  port: 5432,
});

// db.connect();

module.exports = db;