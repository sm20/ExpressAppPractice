'use strict';
var express = require('express');
var router = express.Router();

const {
    getProducts,
    getProduct
} = require('../controllers/products');


router.get('/', getProducts)

router.get('/:prodID',getProduct )


module.exports = router;