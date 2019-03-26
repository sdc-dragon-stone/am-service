// if db is empty, run 'npm run seed' to populate it
// make sure express server is NOT running before running server test script

var chai = require('chai');
var expect = require('chai').expect;
var chaiHTTP = require('chai-http');

var app = require('../server/index.js');

chai.use(chaiHTTP);


describe('Server Tests', () => {

  it('Should GET reviews sorted by most recent date', (done) => {
    chai.request(app)
      .get('/totalReviews')
      .end((err, res) => {
        expect(res.body.reviews[0].date > res.body.reviews[1].date).to.equal(true);
        expect(res.body.reviews[1].date > res.body.reviews[2].date).to.equal(true);
        expect(res.body.reviews[3].date > res.body.reviews[4].date).to.equal(true);
        done();
      });
  });

  it('Should GET reviews with specific data format', (done) => {
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

});