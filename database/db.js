const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mashbnb', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', () => { console.log('db connection error'); });
db.once('open', () => { console.log('connected to db'); });

var reviewSchema = new mongoose.Schema({
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

// const Review = require('./seed.js');

var reviewsByDate = (cb) => {
  Review.find({}).sort('-date').exec((err, reviews) => {
    if (err) {
      console.log('sorted reviews error: ', err);
      cb(err, null);
    }
    cb(null, reviews);
  });
};

module.exports.reviewsByDate = reviewsByDate;
module.exports.Review = Review;



// date to string
// dateName.toUTCString());

// sort by date
// https://stackoverflow.com/questions/5825520/in-mongoose-how-do-i-sort-by-date-node-js