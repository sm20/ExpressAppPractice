'use strict';
var express = require('express');
var router = express.Router();

const {
    newPerson,
    updatePerson,
    deletePerson
} = require('../controllers/people')

//example post request
router.post('/', newPerson)

//example put request using query parameters
router.put('/', updatePerson)

//example delete request using path/route parameters
router.delete('/:pid', deletePerson)


module.exports = router;