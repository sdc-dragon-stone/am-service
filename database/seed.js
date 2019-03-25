const mongoose = require('mongoose');
const Review = require('./db.js').Review;
// test featuer branch
// more stuff
var loremHipsum = require('lorem-hipsum');
var dateGen = require('random-date-generator');
var genName = require('node-random-name');
var genNum = require('random-int');
var picUrl = 'https://i.kinja-img.com/gawker-media/image/upload/s--K-l8wGJH--/c_scale,f_auto,fl_progressive,q_80,w_800/jqncra5xcu3ajxoreokh.jpg';


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
  var endDate = new Date(2019, 2, 1);
  return dateGen.getRandomDateInRange(startDate, endDate);
};


var createReview = () => {

  for (var k = 0; k < 100; k++) {
    var text = genReviewText();
    var date = genDate();
    var accuracy = genNum(1, 5);
    var communication = genNum(1, 5);
    var cleanliness = genNum(1, 5);
    var location = genNum(1, 5);
    var checkin = genNum(1, 5);
    var value = genNum(1, 5);
    var avgRating = ((accuracy + communication + cleanliness + location + checkin + value) / 6).toFixed(2);
    var name = genName({first: true, random: Math.random});

    new Review({
      picture: picUrl,
      name,
      date,
      text,
      accuracy,
      communication,
      cleanliness,
      location,
      checkin,
      value,
      avgRating
    }).save((err) => {
      if (err) {
        console.log('create review in db error: ', err);
      }
    });
  }
  console.log('db populated with reviews');
};

createReview();