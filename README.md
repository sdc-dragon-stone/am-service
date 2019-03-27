# Project Name
Mashbnb
A project aimed at recreating the look and functionality of Airbnb's website

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
- install dependencies using: npm install
- run webpack to create bundle.js using: npm run react-dev
- start express server and serve up bundle.js to browser using: npm run server-dev
- seed data into the mongodb database using: npm run seed
- open index.html file in client/dist folder and go to http://localhost:3004/

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

API -

  app.get('/totalReviews', (req, res) => {

    reviewsByDate((err, allReviews) => {

      (bunch of code that prepares data to be sent to client)

      res.send({reviews, criteria});
    });
  });

My server grabs an array of 100 reviews (objects) from the db, chooses a random amount between 5-100 and populates them with
the necessary data to display on my client side. So far, it looks like this function takes care of everything I'll need to work with
on client side.

res.send is called with an object, first value is an array of x review objects and the second value is an object with 6 rating categories
with the average rating of the x reviews per category.

reviews[0]---
{ _id: '5c9953c0063ebd55ccb3cb91',
  picture:
   'my long pic link',
  name: 'Mitch',
  date: '2012-12-28T19:57:29.041Z',
  text:
   'Sriracha scenester. +1 tote bag gastropub Echo Park
tofu. Ennui Vice.',
  accuracy: 1,
  communication: 4,
  cleanliness: 5,
  location: 5,
  checkin: 3,
  value: 1,
  avgRating: 3.17,
    __v: 0 }

 critera---
 { accuracy: '2.95',
  communication: '3.07',
  cleanliness: '2.95',
  location: '3.28',
  checkin: '3.19',
  value: '3.05',
  totalRating: '3.08' }

