// const createTables = require('../migrations/createTables.js').createTables;
// const dropTables = require('../migrations/createTables.js').dropTables;
// const createReview = require('../postgresData.js')

// const knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '127.0.0.1',
//     user : 'root',
//     password : 'password',
//     database : 'testapp'
//   },
// });

// var startTime = new Date();
// async function seed(totalAmount, count, batchSize) {
//   //count will always start from 1;
//   console.log("----------------------\n seeding at : ", count, "\n----------------------");
//   var data = createReview(batchSize, count);
//   // console.log("this is data", data);
//   await knex.batchInsert('reviews', data.reviews, batchSize)
//   // await knex.raw(knex('reviews').insert(data.reviews).toString())
//   // await knex.insert(data.reviews).into('reviews')
//         .then((data) => {console.log("Reviews Inserted", data)})
//         .catch(err => console.log("error from reviews: ", err));
//   console.log("After inserting reviews");
//   await knex.batchInsert('sub_reviews', data.subReviews, batchSize)
//   // await knex.raw(knex('sub_reviews').insert(data.subReviews).toString())
//   // await knex.insert(data.subReviews).into('sub_reviews')
//         .then((data) => {console.log("Reviews Inserted", data[data.length - 1])})
//         .catch(err => console.log("error from sub_reviews: ",err));
//   console.log("----------------------\n data is seeded at: ", count, "\n----------------------");
//   count += batchSize;
//   if (count <= totalAmount) {
//     seed(totalAmount, count, batchSize);
//   } else {
//     console.log("seeding finised");
//     const elapsed = new Date() - startTime;
//     var resultInMinutes = (elapsed / 60000).toFixed(2);
//     console.log("total time: ", resultInMinutes);
//   }
// }

// async function seed_script() {
//  // await knex.raw('TRUNCATE TABLE sub_reviews, reviews CASCADE').then((data => {console.log("Deleted  ", data)}));
//   // await knex('sub_reviews').del().then((data) => {console.log("Deleted in sub_reviews: ", data)});
//   // await knex('reviews').del().then((data) => {console.log("Deleted in reviews: ", data)});
//   await dropTables(knex).then(() => console.log("Dropped tables")).catch((err) => {console.log(err)});
//   await createTables(knex).then(() => console.log("Created tables")).catch((err) => {console.log(err)});
//   // await knex.raw('ALTER SEQUENCE reviews__id_seq RESTART WITH 1');
//   // await knex.raw('ALTER SEQUENCE sub_reviews__id_seq RESTART WITH 1');
//   seed(10, 1, 1);
// }
// seed_script();
// // In PG
// // batchSize [batchInsert(5000) DataBatchSize(25000)] for 1M => 12.62 min ==> batchInsert has a limit of 5000 chuchSize from stackOverFlow post
//    // ^^ (update) for some reason the chuchsize limit is only for PG, it is worked in mysql.
// // batchSize [raw insert(5000)] for 1M => 8.14 min
// // batchSize [raw insert(5000)] for 1M => 9.96 min
// // insert query have limit batchSize for until 2170, after that it' break got 08P01 error


// // In mySql
// // MySQL Error 1153 - Got a packet bigger than 'max_allowed_packet' bytes ==> need to set max_allowed_packet to higher amount;
// // batchSize [batchInsert(5000) DataBatchSize(25000)] for 1M => 5.08 min
// // batchSize [batchInsert(25000) DataBatchSize(25000)] for 1M => 5.30 min
// // batchSize [batchInsert(15000) DataBatchSize(25000)] for 1M => 6.34 min
// // batchSize 25000 with insert() for 1M => 5.57min

// module.exports.knex = knex;