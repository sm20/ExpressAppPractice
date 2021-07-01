const getHomepage = (req, res) =>
    res.status(200).send('<h1>Home Page</h1>'
        + '<a href="/api/products"> Products</a><br>'
        + '<a href="/api/discounted"> Discounted Products</a><br>'
        + '<a href="/api/invoice">Create Invoice</a><br>')

module.exports = getHomepage