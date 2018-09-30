var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config()
var User = require('./models/users');
var findOrCreate = require('mongoose-findorcreate')
var tutorialRouter = require('./routes/tutorial')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

username = process.env.USER;
password = process.env.PASSWORD
var mongoDB = process.env.DATABASE_LINK;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log("Connection Successful!");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tutorial', tutorialRouter)
app.use('/', indexRouter);

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