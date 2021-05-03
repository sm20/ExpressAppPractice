var { products } = require('../data');

const getProducts = (req, res) => {
    let serveProd = '';
    products.forEach((prod) => {
        serveProd += '<a href="/api/products/' + prod.id + '">' + prod.name + '</a><br>'
    })
    res.status(200).send(serveProd)
}

const getProduct = (req, res) => {
    const { prodID } = req.params
    const foundItem = products.find((item) => item.id === Number(prodID))

    if (!foundItem) {
        res.status(200).send('No Such Product Exists!')
    }
    res.status(200).json(foundItem);
}

module.exports = {
    getProducts,
    getProduct
}