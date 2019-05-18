const createReview = require('./dummyData');
const Review = require('./db.js').Review;
const data = createReview();
Review.collection.drop();
Review.insertMany(data, (err)=> {
  if (err) {
    console.log("error from seed.js", err);
  } else {
    console.log("data is seeded");
  }
})
