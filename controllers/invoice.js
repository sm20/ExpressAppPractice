const PDFDocument = require('pdfkit');  //pdfkit module
const fs = require('fs');   //filesystem module
//var { products } = require('../data');

//end point to create the invoice, email the invoice, and let the user know the invoice has been created
const getInvoice = (req, res) => {

    //Create PDF file
    //const doc = new PDFDocument;    //instance of PDFDocument class
    //doc.pipe(fs.createWriteStream('invoice.pdf'));  //save pdf file in root directory

    //populate PDF file



    //Email Invoice

    //Provide Invoice to the user as HTML, as well as a prompt that shows that the email has been sent
    let serveProd = '';
    res.status(200).send('<p>Test Invoice</p>')
}

module.exports = {
    getInvoice
}