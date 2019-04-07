// if db is empty, run 'npm run seed' to populate it
// make sure express server is NOT running before running server test script

var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var chaiHTTP = require('chai-http');

const express = require('express');
const app = express();
const port = 3004;

app.use(express.static(__dirname + '/../public'));

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

var moment = require('moment');
var dateGen = require('random-date-generator');


chai.use(chaiHTTP);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDB', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', () => { console.log('test db connection error'); });
db.once('open', () => { console.log('connected to test db (testDB.js)'); });

var testDBReviewSchema = new mongoose.Schema({
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

var testDBReview = mongoose.model('DBReview', testDBReviewSchema);

var genDate = () => {
  dateGen.getRandomDate();
  var startDate = new Date(1600, 1, 1);
  var endDate = new Date(2023, 1, 1);
  return dateGen.getRandomDateInRange(startDate, endDate);
};

var createDBReview = () => {

  for (var i = 0; i < 10; i++) {

    new testDBReview({
      indexes: [14, 43, 27, 9, 32],
      id: 5,
      picture: 'test url',
      name: 'test name',
      date: genDate(),
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

createDBReview();

var revsByDate = (cb) => {
  testDBReview.find({}).sort('-date').lean().exec((err, reviews) => {
    if (err) {
      console.log('sorted reviews error: ', err);
      cb(err, null);
    }
    cb(null, reviews);
  });
};


app.get('/testTotalReviews', (req, res) => {

  revsByDate((err, allReviews) => {

    if (err) {
      console.log('Get sorted reviews server error: ', err);
      res.send(404);
    } else {
      var reviews = allReviews.slice(0, 9);
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
        criteria[category] = (criteria[category] / 11).toFixed(2);
        criteria[category] = parseFloat(criteria[category]);
      }

      res.send({reviews, criteria});
    }
  });
});

describe('Server Tests', () => {

  it('Should respond with reviews', (done) => {
    chai.request(app)
      .get('/testTotalReviews')
      .end((err, res) => {
        assert.isAtLeast(res.body.reviews.length, 1);
        done();
      });
  }).timeout(8000);

  it('Should also respond with a criteria object containing 7 categories', (done) => {
    chai.request(app)
      .get('/testTotalReviews')
      .end((err, res) => {
        expect(Object.keys(res.body.criteria).length).to.equal(7);
        done();
      });
  });

  it('Should respond with reviews sorted by most recent date', (done) => {
    chai.request(app)
      .get('/testTotalReviews')
      .end((err, res) => {
        expect(res.body.reviews[0].date >= res.body.reviews[1].date).to.equal(true);
        expect(res.body.reviews[3].date >= res.body.reviews[4].date).to.equal(true);
        expect(res.body.reviews[4].date > res.body.reviews[8].date).to.equal(true);
        done();
      });
  });

  it('Should save a modified version of the date property to shortDate', (done) => {
    chai.request(app)
      .get('/testTotalReviews')
      .end((err, res) => {

        var formatDate = moment(res.body.reviews[0].date).format('MMMM YYYY').split(' ');
        var shortDate = formatDate.join(' ');

        expect(shortDate).to.equal(res.body.reviews[0].shortDate);
        done();
      });
  });

  it('Should respond with reviews in a specific data format', (done) => {
    chai.request(app)
      .get('/testTotalReviews')
      .end((err, res) => {
        console.log(res.body.reviews[0])
        expect(typeof res.body.reviews[0]).to.equal('object');
        expect(Array.isArray(res.body.reviews[0].indexes)).to.equal(true);
        expect(typeof res.body.reviews[0].id).to.equal('number');
        expect(typeof res.body.reviews[0].picture).to.equal('string');
        expect(typeof res.body.reviews[0].name).to.equal('string');
        expect(typeof res.body.reviews[0].date).to.equal('string');
        expect(typeof res.body.reviews[0].shortDate).to.equal('string');
        expect(typeof res.body.reviews[0].text).to.equal('string');
        expect(typeof res.body.reviews[0].accuracy).to.equal('number');
        expect(typeof res.body.reviews[0].communication).to.equal('number');
        expect(typeof res.body.reviews[0].cleanliness).to.equal('number');
        expect(typeof res.body.reviews[0].location).to.equal('number');
        expect(typeof res.body.reviews[0].checkin).to.equal('number');
        expect(typeof res.body.reviews[0].value).to.equal('number');
        expect(typeof res.body.reviews[0].avgRating).to.equal('number');
        mongoose.connection.db.dropDatabase();
        done();
      });
  });

});