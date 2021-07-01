'use strict';
var debug = require('debug')('my express app');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var people = require('./routes/people');
var products = require('./routes/products');
var discounted = require('./routes/discounted');
var invoice = require('./routes/invoice');

var app = express();    //initialize with zero parameter constructor

/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));    //set the 'views' setting to point to the directory
app.set('view engine', 'pug');

// middleware to set websites favicon
app.use(favicon(__dirname + '/public/favicon.ico'));
*/


//middleware to log requests
app.use(logger('dev')); //initialize using constructor that takes in parameter

//middleware to parse incoming request 'bodies' and make them available in the property(req.body)
app.use(bodyParser.json()); //parse incoming payloads of json type
app.use(bodyParser.urlencoded({ extended: false })); //parse incoming payloads of url-encoded type (form data)

//middleware to parse incoming cookie header (http) and populate req.cookies property
app.use(cookieParser());

/*
//middleware to serve the static resources in the public folder
app.use(express.static(path.join(__dirname, 'public')));
*/

//middleware to route to api end points
app.use('/', routes);
app.use('/api/test', people);
app.use('/api/products', products);
app.use('/api/discounted', discounted);
app.use('/api/invoice', invoice)
//app.use('/users', users);


// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});*/

//set server to listen on a port

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
