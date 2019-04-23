const express = require('express');
const app = express();
const port = process.env.PORT || 3004;

var reviewsByDate = require('../database/db.js').reviewsByDate;
var reviewById = require('../database/db.js').reviewById;

var moment = require('moment');

app.use(express.static(__dirname + '/../public'));

app.get('/totalReviews', (req, res) => {
  var id = parseInt(req.query.id);

  reviewById((err, oneReview) => {
    if (err) {
      console.log('Get review error: ', err);
      res.send(404);
    } else {
      reviewsByDate((err, allReviews) => {
        if (err) {
          console.log('Get sorted reviews server error: ', err);
          res.send(404);
        } else {
          var reviews = [];
          var sorted = oneReview.indexes.sort((a, b) => {
            return a - b;
          });

          for (var k = 0; k < sorted.length; k++) {
            var index = sorted[k];
            reviews.push(allReviews[index]);
          }

          var criteria = {
            accuracy: 0,
            communication: 0,
            cleanliness: 0,
            location: 0,
            checkin: 0,
            value: 0,
            totalRating: 0
          };

          for (var i = 0; i < reviews.length; i++) {
            var formatDate = moment(reviews[i].date).format('MMMM YYYY').split(' ');
            reviews[i].shortDate = formatDate.join(' ');

            criteria.accuracy += reviews[i].accuracy;
            criteria.communication += reviews[i].communication;
            criteria.cleanliness += reviews[i].cleanliness;
            criteria.location += reviews[i].location;
            criteria.checkin += reviews[i].checkin;
            criteria.value += reviews[i].value;
            criteria.totalRating += reviews[i].avgRating;
          }

          for (var category in criteria) {
            criteria[category] = (criteria[category] / reviews.length).toFixed(2);
            criteria[category] = parseFloat(criteria[category]);
          }

          res.send({reviews, criteria});
        }
      });
    }
  }, id);

});


app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;