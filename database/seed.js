const mongoose = require('mongoose');
const Review = require('./db.js').Review;

var loremHipsum = require('lorem-hipsum');
var dateGen = require('random-date-generator');
var genName = require('sillyname');
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
  var endDate = new Date(2500, 1, 1);
  return dateGen.getRandomDateInRange(startDate, endDate);
};

var genNum = () => {
  return Math.floor(Math.random() * (6 - 1) + 1);
};


var createReview = () => {

  for (var k = 0; k < 100; k++) {
    var text = genReviewText();
    var date = genDate();
    var accuracy = genNum();
    var communication = genNum();
    var cleanliness = genNum();
    var location = genNum();
    var checkin = genNum();
    var value = genNum();
    var avgRating = (accuracy + communication + cleanliness + location + checkin + value) / 6;
    var name = genName();

    new Review({
      picture: picUrl,
      name,
      date: date.toUTCString(),
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