/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const db = require('../postgresConnect.js');
const Review = require('../db/comments.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

// GET ROUTE ////////////////////////////////
app.get('/api/reviews', (req, res, next) => {
  const id = req.query.id;
  db.query(`select * from reviews where id=${id}`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch(next);
});

// POST ROUTE ////////////////////////////////
app.post('/api/reviews', (req, res, next) => {
  const review = req.body;

  db.query(`INSERT INTO reviews (primaryid, id, timestamp, name, location, title, comment, likes, dislikes, star) VALUES (${review[0].primaryid}, ${review[0].id}, '${review[0].timestamp}', '${review[0].name}', '${review[0].location}', '${review[0].title}', '${review[0].comment}', ${review[0].likes}, ${review[0].dislikes}, ${review[0].star})`)
    .then((res) => {
      res.status(200).send(req.body[0]);
    })
    .catch(next);
});

// PUT ROUTE //////////////////
app.put('/api/reviews', (req, res, next) => {
  var body = req.body[0];

  db.query(`UPDATE reviews SET id = ${body.id}, timestamp = '${body.timestamp}', name = '${body.name}', location = '${body.location}', title = '${body.title}', comment = '${body.comment}', likes = ${body.likes}, dislikes = ${body.dislikes}, star = ${body.star} WHERE primaryid=${body.primaryid}`)
    .then(() => {
      res.status(200).send('Update Successful');
    })
    .catch(next);
});

// DELETE ROUTE /////////////////
app.delete('/api/reviews', (req, res, next) => {
  const id = req.query.id;

  db.query(`DELETE FROM reviews WHERE id=${id}`)
    .then(() => {
      res.status(200).send('Delete Successful');
    })
    .catch(next);
});

module.exports = app;
