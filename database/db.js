const mongoose = require('mongoose');
const moment = require('moment');
require('dotenv').config();

const DBConnection = process.env.DB_CONNECTION_ATLAS || 'mongodb://localhost/mashbnb1';

mongoose.connect(DBConnection, {useNewUrlParser: true});
var db = mongoose.connection;


db.on('connected', () => {
  console.log("mongoose is connected to database");
})
db.on('error', (err) => {
  console.log("mongoose connection error", err);
})
db.on('disconnected', () => {
  console.log("mongoose is disconnected from database");
})

var subReviewSchema = new mongoose.Schema({
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
})

var reviewSchema = new mongoose.Schema({
  _id: Number,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkin: Number,
  value: Number,
  avgRating: Number,
  subReview: [subReviewSchema],
});

var Review = mongoose.model('Review', reviewSchema);

var getReviewById = async (id) => {
  return Review.findById(id).lean().exec()
  .then((result) => {
    var subReviews = result.subReview;
    subReviews.sort(function(a, b){
      return new Date(b.date) - new Date(a.date);
    });
    subReviews.forEach(review => {
      var formatDate = moment(review.date).format('MMMM YYYY').split(' ');
      review.shortDate = formatDate.join(' ');
    });
    var criteria = {
      accuracy: result.accuracy,
      communication: result.communication,
      cleanliness: result.cleanliness,
      location: result.location,
      checkin: result.checkin,
      value: result.value,
      totalRating: result.avgRating
    };
    return {subReviews, criteria};
  })
  .catch(err => err);
}

var deleteOneReview = async (obj) => {
  return Review.deleteOne(obj).exec()
  .then(result => result)
  .catch(err => err);
}

var updateOneReview = async (filter, data) => {
  return Review.updateOne(filter, data, {strict: false}).exec()
  .then(result => result)
  .catch(err => err);
}

var insertOneReview = async (data) => {
  if (!data.hasOwnProperty('_id')) {
    return Review.findOne().sort('-_id').limit(1).lean().exec()
    .then((review) => {
      data._id = review._id + 1;
      return Review.create(data);
    })
    .then(result => result)
    .catch(err => err);
  } else {
    return Review.create(data)
    .then(result => result)
    .catch(err => err);
  }
}

var findOneReview = async (data) => {
  return Review.findOne(data).lean().exec()
  .then(result => result)
  .catch(err => err);
}

module.exports.findOneReview = findOneReview;
module.exports.getReviewById = getReviewById;
module.exports.deleteOneReview = deleteOneReview;
module.exports.updateOneReview = updateOneReview;
module.exports.insertOneReview = insertOneReview;
module.exports.Review = Review;
