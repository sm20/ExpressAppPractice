'use strict';
var express = require('express');
var router = express.Router();

//The various API endpoints found in the associated controller
const {
    newPerson,
    updatePerson,
    deletePerson
} = require('../controllers/people')


//Using the API end points from the controllers. The '/' is relative to the API endpoints specific to people
    //as opposed to simply the index page

//example post request
router.post('/', newPerson)

//example put request using query parameters
router.put('/', updatePerson)

//example delete request using path/route parameters
router.delete('/:pid', deletePerson)

//export in order to be accessible from app.js
module.exports = router;