const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const createReview = require('./dummyData.js');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Names
const dbName = 'mashbnb1';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  const db = client.db(dbName);
  var startTime = new Date();
  async function seed(totalAmount, count, batchSize) {
    //count will always start from 1;
    console.log("----------------------\n seeding at : ", count, "\n----------------------");
    var data = createReview(batchSize, count);
    let result = await db.collection('reviews').insertMany(data).catch(err => console.log(err));
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
  seed(10000000, 1, 250000);
});

// batchSize 25K for 1M = 1.93 min
// batchSize 250K for 10M = 27.60 min