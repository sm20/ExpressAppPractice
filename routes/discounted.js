'use strict';
var express = require('express');
var router = express.Router();

const getDiscounted = require('../controllers/discounted')

router.get('/', getDiscounted)

module.exports = router;