// if db is empty, run 'npm run seed' to populate it

var expect = require('chai').expect;
var assert = require('chai').assert;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDB', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', () => { console.log('test db connection error'); });
db.once('open', () => { console.log('connected to test db (testDB.js)'); });

var testReviewSchema = new mongoose.Schema({
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

var testReview = mongoose.model('Review', testReviewSchema);

var createReview = () => {

  for (var i = 0; i < 10; i++) {

    new testReview({
      indexes: [15, 43, 27, 9, 32],
      id: 5,
      picture: 'test url',
      name: 'test name',
      date: new Date('December 17, 1995 03:24:00'),
      text: 'test text',
      accuracy: 3,
      communication: 3,
      cleanliness: 3,
      location: 3,
      checkin: 3,
      value: 3,
      avgRating: 3
    }).save((err) => {
      if (err) {
        console.log('Create document in test db error: ', err);
      }
    });
  }

  console.log('test db populated');
};

createReview();

var revsByDate = (cb) => {
  testReview.find({}).sort('-date').lean().exec((err, reviews) => {
    if (err) {
      console.log('sorted reviews error: ', err);
      cb(err, null);
    }
    cb(null, reviews);
  });
};


describe('Database Tests', () => {

  it('Should store a review category as a rating of 1-5', (done) => {
    revsByDate((err, results) => {
      assert.isAtLeast(results[0].accuracy, 1);
      assert.isAtMost(results[0].accuracy, 5);
      done();
    });
  }).timeout(6000);

  it('The avgRating should be the average of the six category ratings', (done) => {
    revsByDate((err, results) => {
      var rev = results[0];
      var average = 0;

      average += rev.accuracy + rev.communication + rev.cleanliness + rev.location + rev.checkin + rev.value;
      average /= 6;
      average = average.toFixed(2);
      average = parseFloat(average);

      expect(results[0].avgRating).to.equal(average);
      done();
    });
  }).timeout(3000);

  it('Should store reviews with specific data format', (done) => {
    revsByDate((err, results) => {
      expect(typeof results[0]).to.equal('object');
      expect(Array.isArray(results[0].indexes)).to.equal(true);
      expect(typeof results[0].id).to.equal('number');
      expect(typeof results[0].picture).to.equal('string');
      expect(typeof results[0].name).to.equal('string');
      expect(typeof results[0].date).to.equal('object');
      expect(typeof results[0].text).to.equal('string');
      expect(typeof results[0].accuracy).to.equal('number');
      expect(typeof results[0].communication).to.equal('number');
      expect(typeof results[0].cleanliness).to.equal('number');
      expect(typeof results[0].location).to.equal('number');
      expect(typeof results[0].checkin).to.equal('number');
      expect(typeof results[0].value).to.equal('number');
      expect(typeof results[0].avgRating).to.equal('number');
      mongoose.connection.db.dropDatabase();
      done();
    });
  }).timeout(3000);

});


module.exports.testReview = testReview;