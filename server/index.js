/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
// const db = require('../db/index.js');
const Review = require('../db/comments.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/api/reviews', (req, res) => {
  const { id } = req.query;
  Review.find({ id })
    .exec((err, result) => {
      if (err) { res.sendStatus(500).json('Error while getting reviews'); }
      res.status(200).json(result[0].reviews);
    });
});

app.patch('/api/reviews', (req, res) => {
  const { id } = req.query;
  const filter = { _id: req.body._id };
  const updateLike = !!req.body.like;

  Review.find({ id })
    .exec((err, result) => {
      if (err) { console.log('Error getting reviews', err); }

      const allReviews = result[0].reviews;

      for (let i = 0; i < allReviews.length; i++) {
        if (allReviews[i]._id.toString() === req.body._id) {
          if (updateLike) {
            allReviews[i].like += 1;
          } else {
            allReviews[i].dislike += 1;
          }
          break;
        }
      }

      Review.findOneAndUpdate({ id }, { reviews: allReviews }, (err, result) => {
        if (err) { console.log('Error updating reviews', err); }
        res.status(200).json(result);
      });
    });
});

// Created a new POST route

app.post('/api/reviews', (req, res) => {
  req.body.id = req.query.id;
  const review = req.body;
  Review.create(review)
    .then(() => {
      res.send('successfully posted review');
    })
    .catch((error) => console.log(error));
});

// Created a new PUT route

app.put('/api/reviews', (req, res) => {
  const { id } = req.query;
  const { body } = req;
  Review.update({ id }, body)
    .then(() => {
      res.send('successfully updated review');
    })
    .catch((error) => console.log(error));
});

// Created a new DELETE route

app.delete('/api/reviews', (req, res) => {
  const { id } = req.query;
  Review.deleteOne({ id })
    .then(() => {
      res.send('successfully deleted review');
    })
    .catch((error) => console.log(error));
});

module.exports = app;
