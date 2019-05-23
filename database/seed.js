const createReview = require("./dummyData");
const Review = require("./db.js").Review;
const db = require("./db.js").db;
// const data = createReview();
// Review.collection.drop();
var startTime = new Date();

async function seed(totalAmount, count, batchSize) {
  //count will always start from 1;
  console.log("----------------------\n seeding at : ", count, "\n----------------------");
  var data = createReview(batchSize, count);
  let result = await Review.insertMany(data).catch(err => console.log(err));
  console.log("----------------------\n data is seeded at: ", count, "\n----------------------");
  count += batchSize;
  if (count <= totalAmount) {
    seed(totalAmount, count, batchSize);
  } else {
    console.log("seeding finised");
    const elapsed = new Date() - startTime;
    var resultInMinutes = (elapsed / 60000).toFixed(2);
    console.log("total time: ", resultInMinutes);
  }
}
seed(1000000, 1, 25000);

// batchSize 25000 for 1M => 18.93 min
// batchSize 25000 for 1M => 13.33 min schema changed
// batchSize 25000 for 1M => 4.07 min schema changed (no subDocument)
// batchSize 25000 for 1M => 5.10 min schema changed (subDocument to objectType) (2.5% batch)
// batchSize 35000 for 1M => 4.93 min schema changed (subDocument to objectType)
// batchSize 50000 for 1M => 4.76 min schema changed (subDocument to objectType)
// batchSize 75000 for 1M => 7.82 min schema changed (subDocument to objectType)


// batchSize 250K for 10M => Heap Error
// batchSize 200K for 10M => Mongoose Connection disconnected ( possibly insertMany has limit of operation)
// batchSize 100K for 10M => 73.41 min



