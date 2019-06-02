const knex = require('./db.js').knex;
const createTables = require('../migrations/createTables.js').createTables;
const dropTables = require('../migrations/createTables.js').dropTables;
const createReview = require("./dummyData.js").createReview;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path1 = '/Users/andrewatm/Desktop/rpt12/sdc/am-service/mysql/csv/reviews.csv'
const path2 = '/Users/andrewatm/Desktop/rpt12/sdc/am-service/mysql/csv/sub_reviews.csv'
const option = {
  path: path1,
  header: [
    {id: '_id', titale: '_id'},
    {id: 'accuracy', title: 'accuracy'},
    {id: 'communication', title: 'communication'},
    {id: 'cleanliness', title: 'cleanliness'},
    {id: 'location', title: 'location'},
    {id: 'checkin', title: 'checkin'},
    {id: 'value', title: 'value'},
    {id: 'avgRating', title: 'avgRating'}
  ]
}
const option2 = {
  path: path2,
  header: [
    // {id: '_id', titale: '_id'},
    {id: 'picture', title: 'picture'},
    {id: 'name', title: 'name'},
    {id: 'text', title: 'text'},
    {id: 'date', title: 'date'},
    {id: 'review_id', title: 'review_id'}
  ]
}
var query1 =
  'LOAD DATA LOCAL INFILE "' + path1 +'" '+
  'INTO TABLE reviews ' +
  'FIELDS TERMINATED BY "," '+
  'LINES TERMINATED BY "\n" ' +
  'IGNORE 1 ROWS ' +
  '(_id, accuracy, communication, cleanliness, location, checkin, value, avgRating )'

var query2 =
  'LOAD DATA LOCAL INFILE "' + path2 +'" '+
  'INTO TABLE sub_reviews ' +
  'FIELDS TERMINATED BY "," '+
  'LINES TERMINATED BY "\n" ' +
  'IGNORE 1 ROWS ' +
  '(picture, name, text, date, review_id )'


async function seed (count, batchSize){
  var csvWriterForReviews = createCsvWriter(option);
  var csvWriterForSubReviews = createCsvWriter(option2);
  console.log("----------------------\n seeding from : ", count, "\n----------------------");
  // creating the dummy data
  var data = createReview(batchSize, count);
  // write the csv record then load the query to reviews table
  await csvWriterForReviews.writeRecords(data.reviews).then(() => console.log("data The CSV file was written successfully for reviews"));
  await knex.raw(query1).then(() => console.log('query is finished for reviews'));
  // write the csv record then load the query to reviews sub_reviews table
  await csvWriterForSubReviews.writeRecords(data.subReviews).then(() => console.log("data The CSV file was written successfully for sub_reviews"));
  await knex.raw(query2).then(() => console.log('query is finished for sub_reviews'));

  console.log("after query");
  // create the writer (maybe not needed just wanna make sure)
  csvWriterForReviews = null;
  csvWriterForSubReviews = null;
  console.log("----------------------\n data is seeded at: ", count + (batchSize - 1), "\n----------------------");

}
const startTime = new Date();

async function  runScript(total, count, batchSize, stop) {
  total -= batchSize;
  if (total > 0 && !stop) {
    await seed(count, batchSize);
    count += batchSize;
    runScript(total, count, batchSize, false);
  } else if (total < 0 && !stop) {
    batchSize = batchSize - (total * -1);
    await seed(count, batchSize);
    runScript(total, count, batchSize, true);
  } else if (total === 0 && !stop){
    await seed(count, batchSize);
    runScript(total, count, batchSize, true);
  } else {
    console.log("seeding finished");
    const elapsed = new Date() - startTime;
    var resultInMinutes = (elapsed / 60000).toFixed(2);
    console.log("total time: ", resultInMinutes);
  }
}

module.exports.runScript = runScript;


