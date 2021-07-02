# ExpressNodeJS REST API Example

An example application demonstrating the implementation of a REST API. Most of the logic for the API Endpoints is located in the controllers. This feature branch handles invoice generation and emailing. View the API Documentation section of this readme (below) in order to view a sample request sent through Postman. As a result of the sent request, an email is sent to the email address in the JSON body of the request.

# Prerequisites

- Install the [NodeJS Runtime- version 14.16.1](https://nodejs.org/en/download/)

# Run the Application

- Clone, or Fork, or Download the repository
- From the root of the Project Directory, in the CLI, execute the following commands:
    - `npm install`
    - `npm app`
    - From your browser, navigate to: [http://localhost:3000/](http://localhost:3000/)

You can now test the application using (Postman)[https://www.postman.com/downloads/] and the URL above

# PDF Generation Information

- The PDF invoice was generated using the PDFKit module- [Documentation](https://pdfkit.org/)

# Emailing Service

- The PDF invoice is emailed using the Nodemailer module
    - The following [Steps](https://morioh.com/p/4b3188bee15c) were followed.
        - Note, use `mail` instead of `transformer` as the name of the method during method invokation

# API Documentation

- The documentaion can be found in the API folder. Various formats are provided
- The documentation showing the sample request for an invoice can be found [Here](https://github.com/sm20/ExpressAppPractice/blob/invoiceGen/API/API%20Doc%20-%20Invoice.pdf) 
	-	An example of the resulting generated PDF invoice that is emailed can be found [Here](https://github.com/sm20/ExpressAppPractice/blob/invoiceGen/invoice/invoice.pdf) 
