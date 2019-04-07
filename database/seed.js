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
  var startDate = new Date(2015, 1, 1);
  var endDate = new Date(2019, 4, 5);
  return dateGen.getRandomDateInRange(startDate, endDate);
};

var genReviewList = (amount) => {
  var reviews = [];
  var num = 0;
  for (var i = 0; i < amount; i++) {
    num = faker.random.number({min: 0, max: 99});
    if (!reviews.includes(num)) {
      reviews.push(num);
    }
  }
  return reviews;
};

var createReview = () => {

  for (var k = 1; k <= 100; k++) {
    var revAmount = faker.random.number({min: 7, max: 50});
    var indexes = genReviewList(revAmount);
    var id = k;
    var picture = faker.image.avatar();
    var name = faker.fake('{{name.firstName}}');
    var text = genReviewText();
    var date = genDate();
    var accuracy = faker.random.number({min: 1, max: 5});
    var communication = faker.random.number({min: 1, max: 5});
    var cleanliness = faker.random.number({min: 1, max: 5});
    var location = faker.random.number({min: 1, max: 5});
    var checkin = faker.random.number({min: 1, max: 5});
    var value = faker.random.number({min: 1, max: 5});
    var avgRating = (accuracy + communication + cleanliness + location + checkin + value) / 6;

    new Review({
      indexes,
      id,
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