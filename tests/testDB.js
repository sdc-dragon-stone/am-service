// if db is empty, run 'npm run seed' to populate it

var expect = require('chai').expect;

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

});

