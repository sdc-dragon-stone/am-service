const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'name', title: 'Name'},
    {id: 'surname', title: 'Surname'},
    {id: 'age', title: 'Age'},
    {id: 'gender', title: 'Gender'},
  ]
});

const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: [{a : 1},{a : 1},{a : 1}]
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: [{a : 1},{a : 1},{a : 1}],
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: [{a : 1},{a : 1},{a : 1}]
  }
];

csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));