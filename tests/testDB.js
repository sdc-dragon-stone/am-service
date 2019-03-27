// if db is empty, run 'npm run seed' to populate it

var expect = require('chai').expect;
var assert = require('chai').assert;

var reviewsByDate = require('../database/db.js').reviewsByDate;


describe('Database Tests', () => {

  it('Should contain and send 100 reviews', (done) => {
    reviewsByDate((err, results) => {
      expect(results.length).to.equal(100);
      done();
    });
  });

  it('Should store reviews with specific data format', (done) => {
    reviewsByDate((err, results) => {
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
      done();
    });
  });

  it('Should store review categories as a rating of 1-5', (done) => {
    reviewsByDate((err, results) => {
      assert.isAtLeast(results[0].accuracy, 1);
      assert.isAtMost(results[0].accuracy, 5);
      assert.isAtLeast(results[0].communication, 1);
      assert.isAtMost(results[0].communication, 5);
      assert.isAtLeast(results[0].cleanliness, 1);
      assert.isAtMost(results[0].cleanliness, 5);
      assert.isAtLeast(results[0].location, 1);
      assert.isAtMost(results[0].location, 5);
      assert.isAtLeast(results[0].checkin, 1);
      assert.isAtMost(results[0].checkin, 5);
      assert.isAtLeast(results[0].value, 1);
      assert.isAtMost(results[0].value, 5);
      assert.isAtLeast(results[0].avgRating, 1);
      assert.isAtMost(results[0].avgRating, 5);
      done();
    });
  });

  it('The avgRating should be the average of the six category ratings', (done) => {
    reviewsByDate((err, results) => {
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

});

