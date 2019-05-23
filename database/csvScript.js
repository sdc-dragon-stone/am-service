const createReview = require('./dummyData.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: '_id', title: 'Name'},
    {id: 'accuracy', title: 'accuracy'},
    {id: 'communication', title: 'communication'},
    {id: 'cleanliness', title: 'cleanliness'},
    {id: 'location', title: 'location'},
    {id: 'checkin', title: 'checkin'},
    {id: 'value', title: 'value'},
    {id: 'avgRating', title: 'avgRating'},
    {id: 'subReview', title: 'subReview'}
  ]
});
const data = createReview(100, 1);
const data1 = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: JSON.stringify([{a : 1},{a : 1},{a : 1}]),
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: JSON.stringify([{a : 1},{a : 1},{a : 1}]),
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: JSON.stringify([{a : 1},{a : 1},{a : 1}])
  }
];

csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));