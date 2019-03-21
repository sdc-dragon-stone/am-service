const express = require('express');
const app = express();
const port = 3000;

var reviewsByDate = require('../database/db.js').reviewsByDate;


app.use(express.static(__dirname + '/../client/dist'));


app.get('/totalReviews', (req, res) => {
  var reviewCnt = () => {
    return Math.floor(Math.random() * (101 - 5) + 5);
  };
  reviewsByDate((err, reviews) => {
    if (err) {
      console.log('get sorted reviews server error: ', err);
    } else {
      res.send(reviews.slice(0, reviewCnt()));
    }
  });
});



app.listen(port, () => {
  console.log('Listening on port: ', port);
});