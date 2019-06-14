'use strict';


// Make sure to "npm install faker" first.
const faker = require('faker');
const loremHipsum = require("lorem-hipsum");
const dateGen = require("random-date-generator");

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

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  let accuracy = faker.random.number({ min: 1, max: 5 });
  let communication = faker.random.number({ min: 1, max: 5 });
  let cleanliness = faker.random.number({ min: 1, max: 5 });
  let location = faker.random.number({ min: 1, max: 5 });
  let checkin = faker.random.number({ min: 1, max: 5 });
  let value = faker.random.number({ min: 1, max: 5 });
  let avgRating = faker.random.number({ min: 1, max: 5 });


  var revAmount = faker.random.number({ min: 3, max: 5 });
  var subReview = [];

  for (var i = 0; i < revAmount; i++) {
    let tempReview = {};
    tempReview.picture = faker.image.avatar();
    tempReview.name = faker.fake("{{name.firstName}}");
    tempReview.text = genReviewText();
    tempReview.date = genDate();
    subReview.push(tempReview);
  }

  // add variables to virtual user's context:
  userContext.vars.accuracy = accuracy;
  userContext.vars.communication = communication;
  userContext.vars.cleanliness = cleanliness;
  userContext.vars.location = location;
  userContext.vars.checkin = checkin;
  userContext.vars.value = value;
  userContext.vars.avgRating = avgRating;
  userContext.vars.subReview = subReview;

  // continue with executing the scenario:
  // console.log(userContext);
  return done();

}

module.exports = {
  generateRandomData
};

// generateRandomData({vars : {}}, null, null);