const PDFDocument = require('pdfkit');  //pdfkit module
const fs = require('fs');   //filesystem module
//var { products } = require('../data');

//end point to create the invoice, email the invoice, and let the user know the invoice has been created
const getInvoice = (req, res) => {

    //invoice number
    const invNum = 10023;

    //Current Date
    const today = new Date();
    const date = today.toLocaleDateString();  //formatted

    //customerInfo
    const firstName = 'Sally';
    const lastName = 'May';
    const addressLine1 = '100 Castle Way NE';
    const addressLine2 = 'PO BOX 10245';
    const city = 'Calgary';
    const provinceOrState = 'Alberta';
    const country = 'Canada';
    const postalCode = 'T3N 1J1';

    //Create initial PDF file
    const doc = new PDFDocument({ size: 'LETTER' });    //new instance of PDFDocument class
    doc.pipe(fs.createWriteStream('invoice.pdf'));  //save pdf file in root directory of project


    //populate PDF file

    //header excluding logo
    doc.moveDown(2);
    doc.fontSize(32);
    doc.text('INVOICE', { align: 'right' })
        .moveDown(0.01)
        .fontSize(12)
        .text(`Invoice #: ${invNum}`, { align: 'right' })
        .moveDown(0.25)
        .text(`Date: ${date}`, { align: 'right' })
        .moveDown(0.25)
        .moveTo(72, 181).lineTo(540, 181).stroke()  //horizontal line
        .moveDown(3);

    //logo image
    doc.image('public/GElogo.jpg', 72, 72, { scale: 0.85 })

    //customer information
    doc.fontSize(14)
        .font('Helvetica-Bold')
        .text('Bill To:')
        .moveDown(0.25)
        .fontSize(12)
        .font('Helvetica')
        .text(`${firstName} ${lastName}`)
        .moveDown(0.25)
        .text(`${addressLine1}, ${addressLine2}`)
        .moveDown(0.25)
        .text(`${city}, ${provinceOrState}, ${country}`)
        .moveDown(0.25)
        .text(`${postalCode}`);


    doc.end();



    //Email Invoice

    //Provide Invoice to the user as HTML, as well as a prompt that shows that the email has been sent
    let serveProd = '';
    res.status(200).send('<p>Test Invoice</p>')
}

module.exports = {
    getInvoice
}