'use strict';
var express = require('express');
var router = express.Router();

//The various API endpoints found in the associated controller
const { getInvoice } = require('../controllers/invoice')


//Using the API end points from the controllers. The '/' is relative to the API endpoints specific to people
// as opposed to simply the index page. 
// The second argument is the method name from the controller(or the require above)

//example post request
router.post('/', getInvoice)

//export in order to be accessible from app.js
module.exports = router;