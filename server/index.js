const express = require('express');
const app = express();
const port = process.env.PORT || 3004;

var reviewsByDate = require('../database/db.js').reviewsByDate;
var reviewById = require('../database/db.js').reviewById;

var moment = require('moment');

app.use('/:id', express.static(__dirname + '/../public'));

app.get('/totalReviews/:id', (req, res) => {
  console.log("from server", req.params.id);
  var id = parseInt(req.params.id);
  reviewById((err, sorted) => {
    if (err) {
      console.log('Get review error: ', err);
      res.send(404);
    } else {
      res.send(sorted);
    }
  }, id);
});


app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;
