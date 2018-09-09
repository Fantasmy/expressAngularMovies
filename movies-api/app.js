'use strict'

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const index = require('./routes/index');
const auth = require('./routes/auth');
const movies = require('./routes/movies');

const app = express();

//db
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/movies-mean', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// -- middlewares

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/auth', auth);
app.use('/movies', movies);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({error: 'not found'});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({error: 'unexpected'});
  }
});

module.exports = app;
