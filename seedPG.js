const { Client } = require('pg');
const path = require('path');

// SETUP
const setup = new Client({
  user: 'tonyperletti',
  host: 'localhost',
  database: 'sdc',
  port: 5432,
});

// CREATE A TABLE
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

// SEED QUERY STRING
const seed = `\COPY reviews(primaryId, id, timestamp, name, location, title, comment, likes, dislikes, star) FROM '/Users/tonyperletti/reviews/data.csv' DELIMITER ',' CSV HEADER;`;

// SEED DATABASE SCRIPT
setup.connect()
  .then(() => console.ltime())
  .then(() => setup.query('CREATE DATABASE sdc;'))
  .then(() => setup.query(createReviewsTable))
  .then(() => setup.query(seed))
  .then(() => console.timeEnd())
  .catch(err => console.log(err))
  .then(() => setup.end());
