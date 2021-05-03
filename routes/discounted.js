'use strict';
var express = require('express');
var router = express.Router();

var { products } = require('../data');


//Get list of discounted products

router.get('/', (req, res) => {
    const discProducts = products.filter((item) => ((item["price"] % 1).toFixed(2)) == 0.99);
    res.status(200).json(discProducts);
})

module.exports = router;