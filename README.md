# Project Name
Mashbnb
A project aimed at recreating the look and functionality of Airbnb's website

## Related Projects

  - https://github.com/mash-fec/a-service
  - https://github.com/mash-fec/j-service
  - https://github.com/mash-fec/m-service
  - https://github.com/mash-fec/v-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
- install dependencies using: npm install
- run webpack to create bundle.js using: npm run webpack
- seed data into the mongodb database using: npm run seed
- start express server and serve up bundle.js to browser using: npm run server
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

## API Requests

### Reviews: GET request to '/totalReviews/:id'

```sh
{ subReviews:
   [ { picture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/jodytaggart/128.jpg',
       name: 'Walker',
       text: 'Selvage. Wolf. Meggings Austin street art.',
       date: 2019-03-16T22:27:47.872Z,
       shortDate: 'March 2019' },
     { picture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/timgthomas/128.jpg',
       name: 'Berta',
       text:
        'Normcore direct trade  retro tousled. Cray banjo retro. Food truck.',
       date: 2018-10-16T23:25:55.076Z,
       shortDate: 'October 2018' },
     { picture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/justinrob/128.jpg',
       name: 'Camden',
       text:
        'Semiotics freegan whatever Truffaut. Vegan 90\'s food truck bitters. Helvetica gentrify butcher YOLO Intelligentsia.',
       date: 2017-10-21T03:56:21.272Z,
       shortDate: 'October 2017' },
     { picture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/atariboy/128.jpg',
       name: 'Kaya',
       text:
        'Food truck salvia. Butcher single-origin coffee stumptown. Crucifix Brooklyn retro kitsch.',
       date: 2017-01-17T12:03:54.161Z,
       shortDate: 'January 2017' } ],
  criteria:
   { accuracy: 3.75,
     communication: 3.5,
     cleanliness: 2.75,
     location: 3.5,
     checkin: 2.75,
     value: 4.25,
     totalRating: '4.00' } }
```

### PUT request to '/updateOneReview/:id'

```sh
  { n: 1, nModified: 1, ok: 1 }
```

### POST request to '/createOne/:id'
The only relevant data will be inserted as a new data.
For example:
req.body is {"accuracy" 7, "name_which_is_not_in_schema" : 2}
```sh
  { accuracy: 7, _id: 10000005, __v: 0 }
```


### DELETE request to '/deleteOne/:id'

```sh
  { n: 1, ok: 1, deletedCount: 1 }
```

### GET request to '/readOne/:id'
```sh
  { _id: 2,
  accuracy: 2,
  communication: 3.4,
  cleanliness: 3.2,
  location: 3.8,
  checkin: 2.6,
  value: 3,
  avgRating: '2.40',
  subReview:
   [ { picture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/aka_james/128.jpg',
       name: 'Ezequiel',
       text:
        'Viral irony viral scenester. Keytar. Keytar direct trade  dreamcatcher literally keytar.',
       date: 2018-01-08T00:55:37.481Z },
     { picture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/charliegann/128.jpg',
       name: 'Rossie',
       text:
        'High Life PBR messenger bag four loko ethnic. American Apparel VHS narwhal McSweeney\'s semiotics. Vegan cray bitters ugh.',
       date: 2019-02-08T05:01:28.510Z },
     { picture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/robbschiller/128.jpg',
       name: 'Moriah',
       text:
        'Ethnic. Cray Williamsburg trust fund. Vinyl pop-up bespoke.',
       date: 2019-04-08T08:11:13.608Z },
     { picture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ripplemdk/128.jpg',
       name: 'Delfina',
       text:
        'Leggings roof party. You probably haven\'t heard of them. Pour-over meh.',
       date: 2018-10-17T00:38:48.302Z },
     { picture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/wtrsld/128.jpg',
       name: 'Halie',
       text: 'Kale chips Portland. Retro biodiesel artisan. Trust fund.',
       date: 2016-02-11T12:45:59.274Z } ] }
```