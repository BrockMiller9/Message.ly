/** Database connection for messagely. */

const { Client } = require("pg");
const { DB_URI } = require("./config");

process.env.PGPASSWORD = process.env.DB_PASSWORD;

let client = new Client({
  connectionString: DB_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

module.exports = client;
