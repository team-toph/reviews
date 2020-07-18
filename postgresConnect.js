const { Client, Pool } = require('pg');
const path = require('path');

// SETUP
const setup = new Client({
  user: 'tonyperletti',
  host: 'localhost',
  database: 'mydb',
  password: '',
  port: 5432,
});

const createReviewsTable = `CREATE TABLE reviews (
  primaryId INTEGER PRIMARY KEY,
  id INTEGER,
  timestamp TEXT,
  name TEXT,
  location TEXT,
  title TEXT,
  comment TEXT,
  likes INTEGER,
  dislikes INTEGER,
  star INTEGER
)`;

// CONNECT TO DATABASE IN CONFIG FILE
setup.connect()
  .then(() => console.log('Connection Successful'))
  .then(() => setup.query('CREATE DATABASE sdc;'))
  .catch(err => console.log(err))
  .then(() => setup.end());

// IMPORT DATA INTO TABLE
const client = new Client({
  user: 'tonyperletti',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432,
});

const dataCSV = path.join(__dirname, '/data.csv');
// console.log(dataCSV);

// eslint-disable-next-line quotes
const seed = `\COPY reviews(primaryId, id, timestamp, name, location, title, comment, likes, dislikes, star) FROM '/Users/tonyperletti/reviews/data.csv' DELIMITER ',' CSV HEADER;`;

client.connect()
  .then(() => console.time())
  .then(() => console.log('Client Connected'))
  // .then(() => client.query(createReviewsTable))
  // .then(() => client.query(seed))
  .then(() => console.timeEnd())
  .catch(err => console.log(err))
  // .then(() => client.end());

module.exports = client;