const express = require('express');
const app = express();
const port = 3004;


var reviewsByDate = require('../database/db.js').reviewsByDate;


app.use(express.static(__dirname + '/../client/dist'));


app.get('/totalReviews', (req, res) => {

  reviewsByDate((err, allReviews) => {
    if (err) {
      console.log('Get sorted reviews server error: ', err);
      res.send(404);
    } else {
      var reviewCnt = Math.floor(Math.random() * (101 - 5) + 5);
      var reviews = allReviews.slice(0, reviewCnt);
      var criteria = {
        accuracy: 0,
        communication: 0,
        cleanliness: 0,
        location: 0,
        checkin: 0,
        value: 0,
        totalRating: 0
      };

      reviews.forEach((review) => {
        criteria.accuracy += review.accuracy;
        criteria.communication += review.communication;
        criteria.cleanliness += review.cleanliness;
        criteria.location += review.location;
        criteria.checkin += review.checkin;
        criteria.value += review.value;
        criteria.totalRating += review.avgRating;
      });

      for (var category in criteria) {
        criteria[category] = (criteria[category] / reviewCnt).toFixed(2);
        criteria[category] = parseFloat(criteria[category]);
      }

      res.send({reviews, criteria});
    }
  });
});


var server = app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;