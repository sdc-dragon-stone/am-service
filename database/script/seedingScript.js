const createReview = require('../dummyData.js');

async function seed(db, count, batchSize) {
  //count will always start from 1;
  console.log("----------------------\n seeding at : ", count, "\n----------------------");
  var data = createReview(batchSize, count);
  let result = await db.collection('reviews').insertMany(data).catch(err => console.log(err));
  console.log("----------------------\n data is seeded at: ", count + (batchSize - 1), "\n----------------------");
  data = null;

}
const startTime = new Date();

async function  runScript(db, total, count, batchSize, stop) {
  total -= batchSize;
  if (total > 0 && !stop) {
    await seed(db, count, batchSize);
    count += batchSize;
    runScript(db, total, count, batchSize, false);
  } else if (total < 0 && !stop) {
    batchSize = batchSize - (total * -1);
    await seed(db, count, batchSize);
    runScript(db, total, count, batchSize, true);
  } else if (total === 0 && !stop){
    await seed(db, count, batchSize);
    runScript(db, total, count, batchSize, true);
  } else {
    console.log("seeding finished");
    const elapsed = new Date() - startTime;
    var resultInMinutes = (elapsed / 60000).toFixed(2);
    console.log("total time: ", resultInMinutes);
  }
}

module.exports.runScript = runScript;