var { products } = require('../data');

const getDiscounted = (req, res) => {
    const discProducts = products.filter((item) => ((item["price"] % 1).toFixed(2)) == 0.99);
    res.status(200).json(discProducts);
}

module.exports = getDiscounted