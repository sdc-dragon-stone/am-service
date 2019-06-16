require('newrelic');
const express = require('express');
const app = express();
const port = process.env.PORT || 3004;
const bodyParser = require('body-parser').json();
const {findOneReview, getReviewById, deleteOneReview,
       updateOneReview, insertOneReview} = require('../database/db.js');

var moment = require('moment');
app.use(bodyParser);
app.use('/',express.static(__dirname + '/../public/'));
app.use('/:id', express.static(__dirname + '/../public'));

app.get('/totalReviews/:id', (req, res) => {
  var id = parseInt(req.params.id);
  getReviewById(id)
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    console.log(err);
    res.send(err);
  })
});

app.post('/createOne', (req, res) => {
  insertOneReview(req.body, (err, result) => {
    if (err) {
      console.log("createOne: ", err.code);
      res.send(err);
    } else {
      console.log("successfully created id: ", result._id);
      res.status(200).send(result);
    }
  })
})

app.put('/updateOne/:id', (req, res) => {
  var id = parseInt(req.params.id);
  updateOneReview({_id: id}, {$set: req.body})
  .then((result) => {
    console.log("Updated one review ",result);
    res.status(200).send(result);
  })
  .catch((err) => {
    console.log("put request", err);
    res.send(err);
  })
})

app.get('/readOne/:id', (req, res) => {
  var id = parseInt(req.params.id);
  findOneReview({"_id": req.params.id})
  .then((result) => {
    // console.log("Read one review ", result);
    res.status(200).send(result);
  })
  .catch((err) => {
    console.log("read request", err);
    res.send(err);
  })
})

app.delete('/deleteOne/:id', (req, res) => {
  var id = parseInt(req.params.id);
  deleteOneReview({"_id": id})
  .then((result) => {
    console.log("Delete one review ", result);
    res.status(200).send(result);
  })
  .catch((err) => {
    console.log("error in deleting ", err);
    res.send(err);
  });
})

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;
