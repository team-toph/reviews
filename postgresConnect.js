const { Client, Pool } = require('pg');
// const pgConfig = require('./pgConfig.json');
const path = require('path');

// SETUP
const setup = new Client({
  // user: pgConfig.user,
  user: 'tonyperletti',
  // host: pgConfig.host,
  host: 'localhost',
  // database: pgConfig.database,
  database: 'mydb',
  // password: pgConfig.password,
  password: 'muckluck321',
  // port: pgConfig.port,
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
  // user: pgConfig.user,
  user: 'tonyperletti',
  // host: pgConfig.host,
  host: 'localhost',
  // database: pgConfig.database,
  database: 'sdc',
  // password: pgConfig.password,
  password: 'muckluck321',
  // port: pgConfig.port,
  port: 5432,
});

const dataCSV = path.join(__dirname, '/data.csv');
console.log(dataCSV);

const seed = `\COPY reviews(primaryId, id, timestamp, name, location, title, comment, likes, dislikes, star) FROM '/Users/tonyperletti/reviews/data.csv' DELIMITER ',' CSV HEADER;`;

// const seed = `INSERT INTO reviews (timestamp, name, location, title, comment, likes, dislikes, star) VALUES (\'5:45pm\', \'John\', \'New York\', \'Mayor\', \' He good\', 10, 5, 10)`;

client.connect()
  .then(() => console.time())
  .then(() => console.log('Client Connected'))
  .then(() => client.query(createReviewsTable))
  .then(() => client.query(seed))
  .then(() => console.timeEnd())
  .catch(err => console.log(err))
  .then(() => client.end());
