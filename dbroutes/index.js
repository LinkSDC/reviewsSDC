const { Client } = require('pg');
const fs = require('fs');

const db = new Client({});

db.connect();

module.exports = db;