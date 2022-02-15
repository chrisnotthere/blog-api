require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
var compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// Set up mongoose connection
require('./config/mongoConfig');

// define routes/controllers
const indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(compression()); //Compress all routes
app.use(helmet()); //helps protect against vulnerabilities

const corsOptions = {
  credentials: true, // This is important.
  // origin:'https://chrisnotthere.github.io', 
  // origin:'http://localhost:3000/blog-client', 
  origin: '*',
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
