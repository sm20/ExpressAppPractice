'use strict';
var express = require('express');
var router = express.Router();

var { products} = require('../data');


//Get product information in various formats

//router.get('/api/products', (req, res) => res.status(200).json(products) )
router.get('/', (req, res) => {
    let serveProd = '';
    products.forEach((prod) => {
        serveProd += '<a href="/api/products/' + prod.id + '">' + prod.name + '</a><br>'
    })
    res.status(200).send(serveProd)
})

router.get('/:prodID', (req, res) => {
    const { prodID } = req.params
    const foundItem = products.find((item) => item.id === Number(prodID))

    if (!foundItem) {
        res.status(200).send('No Such Product Exists!')
    }
    res.status(200).json(foundItem);
})

module.exports = router;