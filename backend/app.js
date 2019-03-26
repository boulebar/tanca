var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');

var app = express();

app.use(cors())

const pgOptions = {
  receive: (data, result, e) => {
    camelizeColumns(data);
  }
};

const pgp = require('pg-promise')(pgOptions);

var db = pgp(process.env.DATABASE_URL);

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

const camelizeColumns = (data) => {
  const template = data[0];
  for (let prop in template) {
    const camel = pgp.utils.camelize(prop);
    if (!(camel in template)) {
      for (let i = 0; i < data.length; i++) {
        let d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);

module.exports = app;
