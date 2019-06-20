const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Review = require('./db.js').Review;
const runScript = require('./script/seedingScript.js').runScript;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Names
const dbName = 'mashbnb1';
// Use connect method to connect to the server
// Drop Collection before running the seed
MongoClient.connect(url, async function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  const db = client.db(dbName);
  db.createCollection("counters");
  db.collection("counters").insert({"id":"_id", reference_value: null, seq: 10000000});
  runScript(db, 10000000, 1, 250000, false);
});

// batchSize 25K for 1M = 1.93 min
// batchSize 250K for 10M = 27.60 min