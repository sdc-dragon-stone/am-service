const fs = require("fs");
const path = require("path");
const createOneObject = require("./dummyData.js");

const writeStream = fs.createWriteStream(path.join(__dirname, "data.json"), {
  highWaterMark: 64 * 1024
});

var startTime = new Date();
function writeOneMillionTimes(amount, writer, data, endcoding, callback) {
  let i = 0;
  write();

  function write() {
    let ok = true;
    do {
      i++;
      const intervalId = setInterval(() => {
        if (i >= amount) {
          clearInterval(intervalId);
        }
        console.log(i, 'entries generated...');
      }, 10000);

      if (i === 1) {
        writer.write(`[${data(i)},`, endcoding);
      } else if (i === amount) {
        // last time!
        writer.write(`\n${data(i)}]`, endcoding, callback);
        const elapsed = new Date() - startTime;
        var resultInMinutes = (elapsed / 60000).toFixed(2);
        console.log("total time: ", resultInMinutes);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(`${data(i)},`, endcoding);
      }
    } while (i < amount && ok);
    if (i < amount) {
      // had to stop early!
      // write some more once it drains
      writer.once("drain", write);
    }
  }
}
// const elapsed = new Date() - startTime;
// var resultInMinutes = (elapsed / 60000).toFixed(2);
// console.log("total time: ", resultInMinutes);
writeOneMillionTimes(
  100,
  writeStream,
  createOneObject,
  { highWaterMark: 64 * 1024 },
  () => {
    console.log("done");
  }
);
// 21 min for the 1st attempt with 1M record
  // 17 min for stream and 5 min for mongoImport
  // 28:35
  // 23:25
