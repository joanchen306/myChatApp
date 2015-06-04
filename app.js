var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var query = require('querystring');

//var oauth2lib = require('./oauth20-provider.js');
//var oauth2 = new oauth2lib({log: {level: 2}});

var routes = require('./routes/index');
var chats = require('./routes/chat');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/chat', chats);

//app.use(oauth2.inject());
/*

//token endpoint
app.post('/token', oauth2.controller.token);

//authorization endpoint
app.get('/authorization', isAuthorized, oauth2.controller.authorization, function(req, res) {
  //render decision page
  res.render('/authorization', {layout: false});
});
app.post('/authorization', isAuthorized, oauth2.controller.authorization);

function isAuthorized(req, res, next) {
  if(req.session.authorized) next();
  else {
    var params = req.query;
    params.backUrl = req.path;
    res.redirect('/login?' + query.stringify(params));
  }
}
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//connecting to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/myChatApp', function(err) {
    if(err) {
        console.log('mongodb connection error', err);
    } else {
        console.log('mongodb connection successful');
    }
});


module.exports = app;
