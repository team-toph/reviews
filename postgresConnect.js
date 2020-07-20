const { Client } = require('pg');
const path = require('path');

// SETUP
// const setup = new Client({
//   user: 'tonyperletti',
//   host: 'localhost',
//   database: 'mydb',
//   // password: '',
//   port: 5432,
// });

// // CONNECT TO DATABASE
// setup.connect()
//   .then(() => console.log('Connection Successful'))
//   // .then(() => setup.query('CREATE DATABASE sdc;'))
//   .catch(err => console.log(err))
//   .then(() => setup.end());

// IMPORT DATA INTO TABLE
const client = new Client({
  user: 'tonyperletti',
  host: 'localhost',
  database: 'sdc',
  port: 5432,
});

client.connect();

module.exports = client;