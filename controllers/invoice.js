//const PDFDocument = require('pdfkit');  //pdfkit module for pdf generation
const PDFDocument = require('./pdfkit-tables');
const fs = require('fs');   //filesystem module
var nodemailer = require('nodemailer'); //email with attachments


//end point to create and email the invoice
const emailInvoice = (req, res) => {

    //request payload should include these json keys
 /*   const { invNum } = req.body;    //invoice number
    const { firstName, lastName, addressLine1, addressLine2,    //customer info
        city, provinceOrState, country, postalCode, email } = req.body;

    //relevant parts of address
    let fullAddress = "";
    if (addressLine2 === "") {
        fullAddress = addressLine1;
    } else {
        fullAddress = addressLine1 + ", " + addressLine2;
    }
*/
    const { providerProfession, providerFirstName, providerLastName
        , invoiceNumber, invoiceDate
        , insurerName, insurerAddrLine1, insurerAddrLine2, insurerPhone, insurerCity, insurerProvince
        , clientFirstName, clientLastName, clientAddrLine1, clientAddrLine2, clientCity, clientProvince, clientPhone
        , invoiceItems
         } = req.body;

    //full addresses
    let insurerFullAddr = "";
    if (insurerAddrLine2 === "") {
        insurerFullAddr = insurerAddrLine1 + ', ' + insurerCity + ', ' + insurerProvince;
    } else {
        insurerFullAddr = insurerAddrLine1 + ', ' + insurerAddrLine2 + ', ' + insurerCity + ', ' + insurerProvince;
    }

    let clientFullAddr = "";
    if (clientAddrLine2 === "") {
        clientFullAddr = clientAddrLine1 + ', ' + clientCity + ', ' + clientProvince;
    } else {
        clientFullAddr = clientAddrLine1 + ', ' + clientAddrLine2 + ', ' + clientCity + ', ' + clientProvince;
    }

    //Current Date
    const today = new Date();
    const date = today.toLocaleDateString();  //formatted

    //Create initial PDF file
    const doc = new PDFDocument({ size: 'LETTER', autoFirstPage: false });    //new instance of PDFDocument class
    doc.pipe(fs.createWriteStream('invoice/invoice.pdf'));  //save pdf file in folder: projectRoot/invoice/


    //populate PDF file

    doc.addPage({
        margin: 50
    });

    //header excluding logo
    doc.fontSize(28).font('Times-Roman');
    doc.text('Growth Empowerment', { align: 'right' }).moveDown(0.01)
        .fontSize(14)
        .text('Address: 113 14 Ave NE, Calgary, AB', { align: 'right' }).moveDown(0.25)
        .text('Phone Number: +14552031089', { align: 'right' }).moveDown(0.25)
        .text('Email Address: GrowthEmpowerment@deenstrong.com', { align: 'right' }).moveDown(1)
        .text('Provider Information', { align: 'right' }).moveDown(0.25)
        .text(`${providerProfession}, ${providerFirstName} ${providerLastName}`, { align: 'right' }).moveDown(1);


    //logo image
    doc.image('public/GElogo.jpg', 50, 50, { scale: 0.70 });

    //invoice Information
    doc.fontSize(16).font('Times-Bold')
        .text('Invoice').moveDown(1)
        .fontSize(14).font('Times-Roman')
        .text(`Invoice #: `, { continued: true })
        .text(`${invoiceNumber}`, { underline: true }) //https://stackoverflow.com/questions/20598693/can-i-mix-font-weights-in-the-same-paragraph-when-using-pdfkit
        .text(`Invoice Date: `, { continued: true })
        .text(`${invoiceDate}`, { underline: true })
        .moveDown();

    //Billing Information

    //columns are being used to display the information here: https://github.com/foliojs/pdfkit/issues/819
    //column 1
    let LeftCol1 = 50;  //left margin and starting point for col 1
    let topCol_1and2 = doc.y;   //left margin and starting point for col 1 and 2
    const colWidth = (doc.page.width - 100) / 2;  //-100 for margin consideration
    const leftCol2 = LeftCol1 + colWidth + 10; //col 2 x position including 10 pt buffer
    const colWidth2 = colWidth - 10;    //-10 to balance out previous +10
    let maxY = doc.y;   //initial maximum y value
    //note: track col1col2X, col1Y, col2Y to track columns individually.

    let billingInfo = ['Bill To:', 'Client:', `${insurerName}`, `${clientFirstName} ${clientLastName}`
        , `Address: ${insurerFullAddr}`, `Address: ${clientFullAddr}`
        , `Phone Number: ${insurerPhone}`, `Phone Number: ${clientPhone}`];

    billingInfo.forEach((value, index) => {
        index % 2 == 0 ?
            doc.text(value, LeftCol1, topCol_1and2 = maxY, { width: colWidth }) :
            doc.text(value, leftCol2, topCol_1and2, { width: colWidth2 });
        maxY = (doc.y > maxY) ? doc.y : maxY;
    });
    doc.moveDown(3);

    //Table of items charged

    //destructure incoming data for row 1
    const { dateOfService, service, duration, attendance } = invoiceItems[0];
    let { amount, payment } = invoiceItems[0];
    //amount = Number(amount), payment = Number(payment);

    //construct table- https://www.andronio.me/2017/09/02/pdfkit-tables/
    const table0 = {
        headers: ['Date', 'Service', 'Duration', 'Attendance', 'Amount', 'Payment'],
        rows: [
            [`${dateOfService}`, `${service}`, `${duration} min`, `${attendance}`, `$${amount}`, `$${payment}`]
        ]
    };

    doc.table(table0, {
        prepareHeader: () => doc.font('Times-Roman').fontSize(14),
        prepareRow: (row, i) => doc.font('Times-Roman').fontSize(12)
    });



/*
    //customer information
    doc.fontSize(14).font('Helvetica-Bold')
        .text('Bill To:').moveDown(0.25)
        .fontSize(12).font('Helvetica')
        .text(`${firstName} ${lastName}`).moveDown(0.25)
        .text(`${fullAddress}`).moveDown(0.25)
        .text(`${city}, ${provinceOrState}, ${country}`).moveDown(0.25)
        .text(`${postalCode}`).moveDown(0.25)
        .text(`${email}`)
        .moveDown(3);

    //table column headers

*/
    doc.end();



/*
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



*/
    //response to send back to requester
    res.status(202).json({
        success: true,
       // msg: `Invoice for ${firstName} ${lastName} emailed to ${email}`
        msg: `success`
    });

}

module.exports = {
    emailInvoice
}