const Review = require('./db.js').Review;

const loremHipsum = require('lorem-hipsum');
const dateGen = require('random-date-generator');
const faker = require('faker');


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

  for (var k = 0; k < 100; k++) {
    var picture = faker.image.avatar();
    var name = faker.fake('{{name.firstName}}');
    var text = genReviewText();
    var date = genDate();
    var accuracy = genNum();
    var communication = genNum();
    var cleanliness = genNum();
    var location = genNum();
    var checkin = genNum();
    var value = genNum();
    var avgRating = (accuracy + communication + cleanliness + location + checkin + value) / 6;

    new Review({
      picture,
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
        console.log('Create document in db error: ', err);
      }
    });
  }
  console.log('db populated');
};

createReview();