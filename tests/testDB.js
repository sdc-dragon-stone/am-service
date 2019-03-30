// if db is empty, run 'npm run seed' to populate it

var expect = require('chai').expect;
var assert = require('chai').assert;

var loremHipsum = require('lorem-hipsum');
var dateGen = require('random-date-generator');
var genName = require('node-random-name');
var picUrl = 'https://i.kinja-img.com/gawker-media/image/upload/s--K-l8wGJH--/c_scale,f_auto,fl_progressive,q_80,w_800/jqncra5xcu3ajxoreokh.jpg';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDB', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', () => { console.log('test db connection error'); });
db.once('open', () => { console.log('connected to test db (testDB.js)'); });

var testReviewSchema = new mongoose.Schema({
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

var genReviewText = () => {
  return loremHipsum({
    count: 3,
    units: 'sentences',
    sentenceLowerBound: 1,
    sentenceUpperBound: 5
  });
};

var genDate = () => {
  dateGen.getRandomDate();
  var startDate = new Date(1600, 1, 1);
  var endDate = new Date(2023, 1, 1);
  return dateGen.getRandomDateInRange(startDate, endDate);
};

var genNum = () => {
  return Math.floor(Math.random() * (6 - 1) + 1);
};


var createReview = () => {

  var name = genName({ first: true, random: Math.random });
  var text = genReviewText();
  var date = genDate();
  var accuracy = genNum();
  var communication = genNum();
  var cleanliness = genNum();
  var location = genNum();
  var checkin = genNum();
  var value = genNum();
  var avgRating = (accuracy + communication + cleanliness + location + checkin + value) / 6;

  new testReview({
    picture: picUrl,
    name,
    date,
    text,
    accuracy,
    communication,
    cleanliness,
    location,
    checkin,
    value,
    avgRating: avgRating.toFixed(2)
  }).save((err) => {
    if (err) {
      console.log('Create document in test db error: ', err);
    }
  });

  console.log('test db populated');
};

createReview();

var revsByDate = (cb) => {
  testReview.find({}).sort('-date').exec((err, reviews) => {
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
  }).timeout(3000);

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
  });

  it('Should store reviews with specific data format', (done) => {
    revsByDate((err, results) => {
      expect(typeof results[0]).to.equal('object');
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
  });

});

