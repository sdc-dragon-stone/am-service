// if db is empty, run 'npm run seed' to populate it
// make sure express server is NOT running before running server test script


var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var chaiHTTP = require('chai-http');

var app = require('../server/index.js');

chai.use(chaiHTTP);


describe('Server Tests', () => {

  it('Should respond with 5-100 reviews', (done) => {
    chai.request(app)
      .get('/totalReviews')
      .end((err, res) => {
        assert.isAtLeast(res.body.reviews.length, 5);
        assert.isAtMost(res.body.reviews.length, 100);
        done();
      });
  });

  it('Should also respond with a criteria object containing 7 categories', (done) => {
    chai.request(app)
      .get('/totalReviews')
      .end((err, res) => {
        expect(Object.keys(res.body.criteria).length).to.equal(7);
        done();
      });
  });

  it('Should respond with reviews sorted by most recent date', (done) => {
    chai.request(app)
      .get('/totalReviews')
      .end((err, res) => {
        expect(res.body.reviews[0].date > res.body.reviews[1].date).to.equal(true);
        expect(res.body.reviews[1].date > res.body.reviews[2].date).to.equal(true);
        expect(res.body.reviews[3].date > res.body.reviews[4].date).to.equal(true);
        done();
      });
  });

  it('Should respond with reviews in a specific data format', (done) => {
    chai.request(app)
      .get('/totalReviews')
      .end((err, res) => {
        expect(typeof res.body.reviews[0]).to.equal('object');
        expect(typeof res.body.reviews[0].picture).to.equal('string');
        expect(typeof res.body.reviews[0].name).to.equal('string');
        expect(typeof res.body.reviews[0].date).to.equal('string');
        expect(typeof res.body.reviews[0].text).to.equal('string');
        expect(typeof res.body.reviews[0].accuracy).to.equal('number');
        expect(typeof res.body.reviews[0].communication).to.equal('number');
        expect(typeof res.body.reviews[0].cleanliness).to.equal('number');
        expect(typeof res.body.reviews[0].location).to.equal('number');
        expect(typeof res.body.reviews[0].checkin).to.equal('number');
        expect(typeof res.body.reviews[0].value).to.equal('number');
        expect(typeof res.body.reviews[0].avgRating).to.equal('number');
        done();
      });
  });

  it('Should calculate the average rating of a category between all reviews', (done) => {
    chai.request(app)
      .get('/totalReviews')
      .end((err, res) => {

        var avgAccuracy = 0;

        for (var i = 0; i < res.body.reviews.length; i++) {
          avgAccuracy += res.body.reviews[i].accuracy;
        }

        avgAccuracy = (avgAccuracy / res.body.reviews.length).toFixed(2);
        avgAccuracy = parseFloat(avgAccuracy);

        expect(avgAccuracy).to.equal(res.body.criteria.accuracy);
        done();
      });
  });

  it('Should calculate the average rating between all reviews', (done) => {
    chai.request(app)
      .get('/totalReviews')
      .end((err, res) => {

        var avgRating = 0;

        for (var i = 0; i < res.body.reviews.length; i++) {
          avgRating += res.body.reviews[i].avgRating;
        }

        avgRating = (avgRating / res.body.reviews.length).toFixed(2);
        avgRating = parseFloat(avgRating);

        expect(avgRating).to.equal(res.body.criteria.totalRating);
        done();
      });
  });

});