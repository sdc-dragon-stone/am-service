const mongoose = require('mongoose');
const moment = require('moment');
require('dotenv').config();

const DBConnection = process.env.DB_CONNECTION_ATLAS || 'mongodb://localhost/mashbnb';

mongoose.connect(DBConnection, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', () => { console.log('db connection error: ', DBConnection); });
db.once('open', () => { console.log('connected to db (db.js)'); });

var reviewSchema = new mongoose.Schema({
  indexes: Array,
  id: Number,
  picture: String,
  name: String,
  date: Date,
  text: String,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkin: Number,
  value: Number,
  avgRating: Number,
});

var Review = mongoose.model('Review', reviewSchema);


var reviewsByDate = (cb) => {

};

var reviewById = (cb, id) => {
  Review.findOne({id}).lean().exec((err, review) => {
    if (err) {
      console.log('sorted reviews error: ', err);
      cb(err, null);
    }
    var sorted = review.indexes.sort((a, b) => {
      return a - b;
    });
    Review.find({}).sort('-date').lean().exec((err, allReviews) => {
      if (err) {
        console.log('sorted reviews error: ', err);
        cb(err, null);
      }
      var reviews = [];
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
      // console.log("*******db.js ", {reviews, criteria});

      cb(null, {reviews, criteria});
    });
  });
};

module.exports.reviewsByDate = reviewsByDate;
module.exports.reviewById = reviewById;
module.exports.Review = Review;
