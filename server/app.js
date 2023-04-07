const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');

const knex = require('./db/dbConnections.js');
const {
  getListItem,
  postListItem,
  deleteListItem,
} = require('./db/controllers/lists.js');

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const store = new KnexSessionStore({
  knex,
  tablename: 'sessions',
});

const app = express();

// Global config from Environment
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const SESSION_SECRET =
  process.env.SESSION_SECRET || '6f646a6c6e6775306d7a68686d64637';

// express app configuration
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true,
  })
);
app.use(
  session({
    store: store,
    name: 'connect.sid',
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // in milliseconds: ms * s * m * h = 1 day
    },
  })
);

const errorMessage =
  'The data you are looking for could not be found. Please try again';

const userRouter = require('./routes/user.route.js');
app.use('/user', userRouter);

app.get('/', (req, res) => {
  console.log(app);
  res.status(200).json('server running');
});


// Get All Items
//http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items
app.get("/_api/web/lists/GetByTitle\\(':listTitle'\\)/items", (req, res) => {
  console.log(req.params.listTitle);
  getListItem(req.params.listTitle)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Get Single Items
// http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(1)
// http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
app.get(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)",
  (req, res) => {
    const listLocation = req.params.listTitle;
    const itemId = req.params.itemId;
    getListItem(listLocation, itemId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

// Post List Item
//http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items
//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items

// TODO - Need to check to see if user can edit assets with user authentication
app.post("/_api/web/lists/GetByTitle\\(':listTitle'\\)/items", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const listLocation = req.params.listTitle;
  const [payload] = req.body;
  postListItem(listLocation, { ...payload, EditorId: req.session.user.userId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Update List Item
//http://localhost:3001/_api/web/lists/GetByTitle('Reservations')/items(1)
//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
// TODO - Need to check to see if user can edit assets with user authentication
app.put(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)",
  (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const listLocation = req.params.listTitle;
    const [payload] = req.body;
    const itemId = req.params.itemId;

    postListItem(
      listLocation,
      {
        ...payload,
        AuthorId: req.session.user.userId,
        EditorId: req.session.user.userId,
      },
      itemId
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

//http://localhost:3001/_api/web/lists/GetByTitle('Assets')/items(1)
// TODO - Need to check to see if user can delete assets with user authentication
app.delete(
  "/_api/web/lists/GetByTitle\\(':listTitle'\\)/items\\(:itemId\\)",
  (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const listLocation = req.params.listTitle;
    const itemId = req.params.itemId;

    deleteListItem(listLocation, itemId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

module.exports = app;

// payload tests
//Assets
// [
//   {
//     "Serial": "x1y2z3",
//     "Equipment": "SA-20",
//     "Threat": "XM-15",
//     "ThreatType": "Manned",
//     "SystemInformation": "some string",
//     "StatusDate": "2022-11-02T19:44:06Z",
//     "Status": "GREEN",
//     "ETIC": "2022-11-02T19:44:06Z",
//     "Remarks": "some string",
//     "Schedulable": true,
//     "Operational": true,
//     "Range": 2205,
//     "SiteLocation": "string ex Charlie Batt",
//     "Latitude": "37.220",
//     "Longitude": "123.456",
//     "Elevation": 2000,
//     "Accuracy": "+/- 2m",
//     "CoordSource": "GARMIN GPX 55I",
//     "CoordRecordedDate": "2022-11-02T19:44:06Z"
//   }
// ]
// Reservations
// [
//   {
//     "Squadron": "VMGR-152",
//     "ContactDSN": "123-456-7890",
//     "Range": 2211,
//     "SiteLocation": "Charlie batt",
//     "Threat": "SA-3",
//     "Equipment": "T-2",
//     "ThreatType": "unmanned",
//     "EndDate": "2021-05-18T19:00:00Z",
//     "EventDate": "2021-05-18T21:00:00Z",
//     "Notes": "fgdsfjgkfgds",
//     "Status": "Pending"
//   }
// ]
