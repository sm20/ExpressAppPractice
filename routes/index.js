'use strict';
var express = require('express');
var router = express.Router();

/*var getData = function() {
    var data = {
        'item1': 'http://public-domain-photos.com/free-stock-photos-1/flowers/cactus-76.jpg',
        'item2': 'http://public-domain-photos.com/free-stock-photos-1/flowers/cactus-77.jpg',
        'item3': 'http://public-domain-photos.com/free-stock-photos-1/flowers/cactus-78.jpg'
    }
    return data;
}*/

/* GET home page. */
router.get('/', (req, res) =>
    res.status(200).send('<h1>Home Page</h1>'
        + '<a href="/api/products"> Products</a><br>'
        + '<a href="/api/products/discounted"> Discounted Products</a>')
)

module.exports = router;
