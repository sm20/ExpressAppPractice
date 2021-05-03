'use strict';
var express = require('express');
var router = express.Router();

var { products, people } = require('../data');


//Get product information in various formats

//router.get('/api/products', (req, res) => res.status(200).json(products) )
router.get('/api/products', (req, res) => {
    let serveProd = '';
    products.forEach((prod) => {
        serveProd += '<a href="/api/products/' + prod.id + '">' + prod.name + '</a><br>'
    })
    res.status(200).send(serveProd)
})

router.get('/api/products/:prodID', (req, res) => {
    const { prodID } = req.params
    const foundItem = products.find((item) => item.id === Number(prodID))

    if (!foundItem) {
        res.status(200).send('No Such Product Exists!')
    }
    res.status(200).json(foundItem);
})

router.get('/api/products/discounted', (req, res) => {
    const discProducts = products.filter((item) => ((item["price"] % 1).toFixed(2)) == 0.99);
    res.status(200).json(discProducts);
})

module.exports = router;