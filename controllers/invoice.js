const PDFDocument = require('pdfkit');  //pdfkit module
const fs = require('fs');   //filesystem module
//var { products } = require('../data');

//end point to create the invoice, email the invoice, and let the user know the invoice has been created
const getInvoice = (req, res) => {

    //request payload should include these json keys
    const { invNum } = req.body;    //invoice number
    const { firstName, lastName, addressLine1, addressLine2,    //customer info
        city, provinceOrState, country, postalCode, email } = req.body;

    //Current Date
    const today = new Date();
    const date = today.toLocaleDateString();  //formatted

    //Create initial PDF file
    const doc = new PDFDocument({ size: 'LETTER' });    //new instance of PDFDocument class
    doc.pipe(fs.createWriteStream('invoice/invoice.pdf'));  //save pdf file in folder: projectRoot/invoice/


    //populate PDF file

    //header excluding logo
    doc.moveDown(2);
    doc.fontSize(32);
    doc.text('INVOICE', { align: 'right' }).moveDown(0.01)
        .fontSize(12)
        .text(`Invoice #: ${invNum}`, { align: 'right' }).moveDown(0.25)
        .text(`Date: ${date}`, { align: 'right' }).moveDown(0.25)
        .moveTo(72, 181).lineTo(540, 181).stroke()  //horizontal line
        .moveDown(3);

    //logo image
    doc.image('public/GElogo.jpg', 72, 72, { scale: 0.85 })

    //customer information
    doc.fontSize(14).font('Helvetica-Bold')
        .text('Bill To:').moveDown(0.25)
        .fontSize(12).font('Helvetica')
        .text(`${firstName} ${lastName}`).moveDown(0.25)
        .text(`${addressLine1}, ${addressLine2}`).moveDown(0.25)
        .text(`${city}, ${provinceOrState}, ${country}`).moveDown(0.25)
        .text(`${postalCode}`).moveDown(0.25)
        .text(`${email}`)
        .moveDown(3);

    doc.end();

    //response to send back to requester
    res.status(202).json({
        success: true,
        msg: `Invoice for ${firstName} ${lastName} emailed to ${email}`
    });

    //Email Invoice

}

module.exports = {
    getInvoice
}