// const Review = require('./db.js').Review;
const moment = require('moment');
const loremHipsum = require('lorem-hipsum');
const dateGen = require('random-date-generator');
const faker = require('faker');
const Review = require('./db.js').Review;
Review.collection.drop();
Review.collection.initializeOrderedBulkOp
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

var createReview = () => {
  var bulkData = [];
  const startTime = new Date();
  for (var k = 1; k <= 250000; k++) {

    var revAmount = faker.random.number({min: 7, max: 50});
    var reviewArray = [];
    var tempReview = {};
    tempReview._id = k;
    tempReview.accuracy = 0;
    tempReview.communication = 0;
    tempReview.cleanliness = 0;
    tempReview.location = 0;
    tempReview.checkin = 0;
    tempReview.value = 0;
    tempReview.avgRating = 0;

    for (var i = 0; i < revAmount; i++) {
      var tempSubReview = {};

      tempSubReview.picture = faker.image.avatar();
      tempSubReview.name = faker.fake('{{name.firstName}}');
      tempSubReview.text = genReviewText();
      tempSubReview.date = genDate();
      tempSubReview.accuracy = faker.random.number({min: 1, max: 5});
      tempSubReview.communication = faker.random.number({min: 1, max: 5});
      tempSubReview.cleanliness = faker.random.number({min: 1, max: 5});
      tempSubReview.location = faker.random.number({min: 1, max: 5});
      tempSubReview.checkin = faker.random.number({min: 1, max: 5});
      tempSubReview.value = faker.random.number({min: 1, max: 5});
      tempSubReview.avgRating =(tempSubReview.accuracy + tempSubReview.communication + tempSubReview.cleanliness +
                                 tempSubReview.location + tempSubReview.checkin + tempSubReview.value) / 6

      reviewArray.push(tempSubReview);

      tempReview.accuracy += tempSubReview.accuracy;
      tempReview.communication += tempSubReview.communication;
      tempReview.cleanliness += tempSubReview.cleanliness;
      tempReview.location += tempSubReview.location;
      tempReview.checkin += tempSubReview.checkin;
      tempReview.value += tempSubReview.value;
      tempReview.avgRating += tempSubReview.avgRating;

    }

    tempReview.subReview = reviewArray;
    tempReview.accuracy = parseFloat((tempReview.accuracy / revAmount).toFixed(2));
    tempReview.communication = parseFloat((tempReview.communication / revAmount).toFixed(2));
    tempReview.cleanliness = parseFloat((tempReview.cleanliness / revAmount).toFixed(2));
    tempReview.location = parseFloat((tempReview.location / revAmount).toFixed(2));
    tempReview.checkin = parseFloat((tempReview.checkin / revAmount).toFixed(2));
    tempReview.value = parseFloat((tempReview.value / revAmount).toFixed(2));
    tempReview.avgRating = parseFloat((tempReview.avgRating / revAmount)).toFixed(2);

    // bulkData.push(tempReview);
    console.log("loop ", k);
    var count = 0;
    if (k === 250000) {
      Review.insertMany(bulkData, (err)=> {
        if (err) {
          console.log("error from seed.js", err);
        } else {
          console.log("data is seeded");
        }
      })
      // count++;
      // k = 1;
      bulkData = [];
    }
    //end of for loop
  }
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
  const elapsed = new Date() - startTime;
  var resultInMinutes = Math.round(elapsed / 60000);
  console.log("total time: ", resultInMinutes);
  return bulkData;
};
createReview();
module.exports = createReview;






