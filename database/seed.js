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
// db.on("open", async err => {
//   if (err) {
//     console.log("error in connecting db", err);
//   } else {
//     //  await Review.collection.drop();
//     var bulk = Review.collection.initializeOrderedBulkOp();
//     var bulkData = [];
//     const startTime = new Date();
//     for (var k = 1; k <= 1000000; k++) {
//       var revAmount = faker.random.number({ min: 7, max: 50 });
//       var reviewArray = [];
//       var tempReview = {};
//       tempReview._id = k;
//       tempReview.accuracy = 0;
//       tempReview.communication = 0;
//       tempReview.cleanliness = 0;
//       tempReview.location = 0;
//       tempReview.checkin = 0;
//       tempReview.value = 0;
//       tempReview.avgRating = 0;

//       for (var i = 0; i < revAmount; i++) {
//         var tempSubReview = {};

//         tempSubReview.picture = faker.image.avatar();
//         tempSubReview.name = faker.fake("{{name.firstName}}");
//         tempSubReview.text = genReviewText();
//         tempSubReview.date = genDate();
//         tempSubReview.accuracy = faker.random.number({ min: 1, max: 5 });
//         tempSubReview.communication = faker.random.number({ min: 1, max: 5 });
//         tempSubReview.cleanliness = faker.random.number({ min: 1, max: 5 });
//         tempSubReview.location = faker.random.number({ min: 1, max: 5 });
//         tempSubReview.checkin = faker.random.number({ min: 1, max: 5 });
//         tempSubReview.value = faker.random.number({ min: 1, max: 5 });
//         tempSubReview.avgRating =
//           (tempSubReview.accuracy +
//             tempSubReview.communication +
//             tempSubReview.cleanliness +
//             tempSubReview.location +
//             tempSubReview.checkin +
//             tempSubReview.value) /
//           6;

//         reviewArray.push(tempSubReview);

//         tempReview.accuracy += tempSubReview.accuracy;
//         tempReview.communication += tempSubReview.communication;
//         tempReview.cleanliness += tempSubReview.cleanliness;
//         tempReview.location += tempSubReview.location;
//         tempReview.checkin += tempSubReview.checkin;
//         tempReview.value += tempSubReview.value;
//         tempReview.avgRating += tempSubReview.avgRating;
//       }

//       tempReview.subReview = reviewArray;
//       tempReview.accuracy = parseFloat(
//         (tempReview.accuracy / revAmount).toFixed(2)
//       );
//       tempReview.communication = parseFloat(
//         (tempReview.communication / revAmount).toFixed(2)
//       );
//       tempReview.cleanliness = parseFloat(
//         (tempReview.cleanliness / revAmount).toFixed(2)
//       );
//       tempReview.location = parseFloat(
//         (tempReview.location / revAmount).toFixed(2)
//       );
//       tempReview.checkin = parseFloat(
//         (tempReview.checkin / revAmount).toFixed(2)
//       );
//       tempReview.value = parseFloat((tempReview.value / revAmount).toFixed(2));
//       tempReview.avgRating = parseFloat(
//         tempReview.avgRating / revAmount
//       ).toFixed(2);

//       bulkData.push(tempReview);
//       console.log("loop ", k);

//       if (k % 200 === 0) {
//         await Review.collection.insert(bulkData, err => {
//           if (err) {
//             console.log("error from seed.js", err);
//           } else {
//             console.log("data is seeded");
//           }
//         });
//         bulkData = []
//       }
//     //   await bulk.insert(tempReview);
//     // // Execute the batch if batchsize reached
//     //   if (i % 20 == 0) {
//     //     await bulk.execute();
//     //   }
//       //end of for loop

//     }
//   }
// });