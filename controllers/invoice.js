//var { products } = require('../data');

//end point to create the invoice, email the invoice, and let the user know the invoice has been created
const getInvoice = (req, res) => {

    //Create Invoice

    //Email Invoice

    //Provide Invoice to the user as HTML, as well as a prompt that shows that the email has been sent
    let serveProd = '';
    res.status(200).send('<p>Test Invoice</p>')
}

module.exports = {
    getInvoice
}