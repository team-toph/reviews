const fs = require('fs');
const path = require('path');
const cassandra = require('cassandra-driver');
const authProvider = new cassandra.auth.PlainTextAuthProvider('main', 'user');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  authProvider: authProvider
});

var start = Date.now();
var pathName = './data.csv';


//Execute the queries

// var possibleQuery = `COPY reviews.reviews (id,name,location,timestamp,title,comment,likes,dislikes,star) FROM '${pathName}' `;

client.execute('drop keyspace if exists reviews')
  .then(() => {
    // eslint-disable-next-line quotes
    return client.execute(`CREATE KEYSPACE reviews WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'} AND DURABLE_WRITES = 'true'`);
  })
  .then(() => {
    // eslint-disable-next-line quotes
    return client.execute(`USE reviews`);
  })
  .then(() => {
    // eslint-disable-next-line quotes
    return client.execute(`CREATE TABLE reviews (id int PRIMARY KEY,name text,location text,timestamp text, title text, comment text, likes int, dislikes int, star int)`);
  })
  .then(() => {
    return console.log('Start time: ', start);
  })
  .catch((err) => {
    console.error('Connection to Cassandra products db failed:', err);
  })
  .then(() => {
    client.shutdown();
  });