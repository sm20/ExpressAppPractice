const PDFDocument = require('pdfkit');  //pdfkit module for pdf generation
const fs = require('fs');   //filesystem module
var nodemailer = require('nodemailer'); //email with attachments


//end point to create and email the invoice
const emailInvoice = (req, res) => {

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




    //Email Invoice

    //create email transporter
    var mail = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'test0932843092@outlook.com',
            pass: 'Ytgc4!LfYXLO'
        }
    });

    //set email body
    var mailOptions = {
        from: 'test0932843092@outlook.com',
        to: `${email}`,
        subject: 'Your Session Invoice',
        text: 'Your Invoice for your session is attached.',
        attachments: [{
            //file on disk as an attachment
            filename: 'invoice.pdf',
            path: 'invoice/invoice.pdf'
        }]
    };

    //send email using transporter
    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });




    //response to send back to requester
    res.status(202).json({
        success: true,
        msg: `Invoice for ${firstName} ${lastName} emailed to ${email}`
    });

}

module.exports = {
    emailInvoice
}