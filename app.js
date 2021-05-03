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

var { products, people } = require('./data');

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

//example GET requests

app.get('/', (req, res) => 
    res.status(200).send('<h1>Home Page</h1>'
                + '<a href="/api/products"> Products</a><br>'
                + '<a href="/api/discounted"> Discounted Products</a>')
)

//app.get('/api/products', (req, res) => res.status(200).json(products) )
app.get('/api/products', (req, res) => {
    let serveProd = '';
    products.forEach((prod) => {
        serveProd += '<a href="/api/products/' + prod.id + '">' + prod.name + '</a><br>'
    })
    res.status(200).send(serveProd)
})

app.get('/api/products/:prodID', (req, res) => {
    const { prodID } = req.params
    const foundItem = products.find((item) => item.id === Number(prodID))

    if (!foundItem) {
        res.status(200).send('No Such Product Exists!')
    }
    res.status(200).json(foundItem);
})

app.get('/api/discounted', (req, res) => {
    const discProducts = products.filter((item) => ((item["price"] % 1).toFixed(2)) == 0.99);
    res.status(200).json(discProducts);
})

//example post request
app.post('/api/test', (req,res) => {
    const { id, name } = req.body;   //request payload should include these json keys
    res.status(202).json({success: true, data: id, name}); //or just send 'data: req.body'
})

//example put request using query parameters
app.put('/api/test', (req, res) => {
    const { qid, qname } = req.query
    console.log(qid)
    const { id, name } = req.body

    if (Number(qid) !== 4)
        return res.status(200).json({ success: false, msg: 'id not on file' })
    if (qname !== 'Cynthia')
        return res.status(200).json({ success: false, msg: 'name not on file' })

    res.status(200).json({ sucess: true, msg: 'Information Updated', data: {id, name} })
})

//example delete request using path/route parameters
app.delete('/api/test/:pid', (req, res) => {
    const exists = people.find((person) => person.id === Number(req.params.pid))

    if (exists)
        return res.status(200).json({ success: true, msg: `person with id:${req.params.pid} deleted` })

    res.status(200).json({ success: false, msg: 'Person does not exist' })
})


//app.use('/', routes);
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
