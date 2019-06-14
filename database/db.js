const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment');
require('dotenv').config();

const DBConnection = process.env.DB_CONNECTION_ATLAS || 'mongodb://127.0.0.1/mashbnb1';

function retryableConnection() {
  mongoose.connect(DBConnection, {useNewUrlParser: true}).then(() => {
  console.log("Connected to Database");
  }).catch((err) => {
    console.log("MongoDB disconnected Error", err)
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(retryableConnection, 5000);
  });
}
retryableConnection();

var db = mongoose.connection;
db.on('connected', () => {
  console.log("mongoose is connected to database");
})
db.on('error', (err) => {
  console.log("mongoose connection error");
  retryableConnection();
})
db.on('disconnected', () => {
  console.log("mongoose is disconnected from database");
  retryableConnection();
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
  subReview: Object
},{ _id: false });

reviewSchema.plugin(AutoIncrement);

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
}

var deleteOneReview = async (obj) => {
  return Review.deleteOne(obj).exec()
}

var updateOneReview = async (filter, data) => {
  return Review.updateOne(filter, data, {strict: false}).exec()
}

var insertOneReview = (data, cb) => {
  Review.create(data)
  .then(data => cb (null, data))
  .catch(err => cb(err, null));
}

var findOneReview = async (data) => {
  return Review.findById(data).lean().exec()
}

module.exports.findOneReview = findOneReview;
module.exports.getReviewById = getReviewById;
module.exports.deleteOneReview = deleteOneReview;
module.exports.updateOneReview = updateOneReview;
module.exports.insertOneReview = insertOneReview;
module.exports.Review = Review;
module.exports.db = db;
