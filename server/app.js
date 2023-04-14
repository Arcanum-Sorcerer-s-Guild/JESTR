const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const knex = require('./db/dbConnections.js');

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

const userRouter = require('./routes/user.route.js');
app.use('/user', userRouter);

const sharepointRouter = require('./routes/sharepoint.route.js');
app.use('/_api/web', sharepointRouter);

const metricsRouter = require('./routes/metrics.route.js');
app.use('/metrics', metricsRouter);

app.get('/', (req, res) => {
  console.log(app);
  res.status(200).json('server running');
});

module.exports = app;
