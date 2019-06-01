// const Review = require('./db.js').Review;
const moment = require("moment");
const loremHipsum = require("lorem-hipsum");
const dateGen = require("random-date-generator");
const faker = require("faker");

var genReviewText = () => {
  return loremHipsum({
    count: 3,
    units: "sentences",
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

function createReview(amount, id) {
  var bulk = [];
  for (var k = 0; k < amount; k++) {
    var temp = amount / 10;
    if (k % temp === 0) {
      console.log(k + temp, "records are generated");
    }
    var revAmount = faker.random.number({ min: 3, max: 5 });
    var reviewArray = [];
    var tempReview = {};
    tempReview._id = id;
    tempReview.accuracy = 0;
    tempReview.communication = 0;
    tempReview.cleanliness = 0;
    tempReview.location = 0;
    tempReview.checkin = 0;
    tempReview.value = 0;
    tempReview.avgRating = 0;

    for (var i = 0; i < revAmount; i++) {
      var tempSubReview = {};
      var tempSubReview1 = {};
      tempSubReview1.picture = faker.image.avatar();
      tempSubReview1.name = faker.fake("{{name.firstName}}");
      tempSubReview1.text = genReviewText();
      tempSubReview1.date = genDate();
      tempSubReview.accuracy = faker.random.number({ min: 1, max: 5 });
      tempSubReview.communication = faker.random.number({ min: 1, max: 5 });
      tempSubReview.cleanliness = faker.random.number({ min: 1, max: 5 });
      tempSubReview.location = faker.random.number({ min: 1, max: 5 });
      tempSubReview.checkin = faker.random.number({ min: 1, max: 5 });
      tempSubReview.value = faker.random.number({ min: 1, max: 5 });
      tempSubReview.avgRating = faker.random.number({ min: 1, max: 5 });
      (tempSubReview.accuracy +
        tempSubReview.communication +
        tempSubReview.cleanliness +
        tempSubReview.location +
        tempSubReview.checkin +
        tempSubReview.value) /
        6;

      reviewArray.push(tempSubReview1);

      tempReview.accuracy += tempSubReview.accuracy;
      tempReview.communication += tempSubReview.communication;
      tempReview.cleanliness += tempSubReview.cleanliness;
      tempReview.location += tempSubReview.location;
      tempReview.checkin += tempSubReview.checkin;
      tempReview.value += tempSubReview.value;
      tempReview.avgRating += tempSubReview.avgRating;
    }

    tempReview.subReview = reviewArray;
    tempReview.accuracy = parseFloat(
      (tempReview.accuracy / revAmount).toFixed(2)
    );
    tempReview.communication = parseFloat(
      (tempReview.communication / revAmount).toFixed(2)
    );
    tempReview.cleanliness = parseFloat(
      (tempReview.cleanliness / revAmount).toFixed(2)
    );
    tempReview.location = parseFloat(
      (tempReview.location / revAmount).toFixed(2)
    );
    tempReview.checkin = parseFloat(
      (tempReview.checkin / revAmount).toFixed(2)
    );
    tempReview.value = parseFloat((tempReview.value / revAmount).toFixed(2));
    tempReview.avgRating = parseFloat(tempReview.avgRating / revAmount).toFixed(
      2
    );
    id++;
    bulk.push(tempReview);
    //end of loop
  }
  return bulk;
}

module.exports = createReview;
