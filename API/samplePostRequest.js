//sample POST request body to create and email a PDF invoice, using Postman

{
	"providerProfession": "Registered Psychologist",
	"providerFirstName": "Shahid",
    "providerLastName": "Khan",

    "invoiceNumber": "8984A45",
    "invoiceDate": "2020-01-01",

    "insurerName": "Manulife",
    "insurerAddrLine1": "116 7th ave NW",
    "insurerAddrLine2": "",
    "insurerCity": "Calgary",
    "insurerProvince": "AB",
    "insurerPhone": "437-891-8886",
    "clientFirstName": "Usha",
    "clientLastName": "Banerjee",
    "clientAddrLine1": "1056 14th ave NW",
    "clientAddrLine2": "",
    "clientCity": "Calgary",
    "clientProvince": "AB",
    "clientPhone": "437-123-467",

    "invoiceItems": [
        {
            "dateOfService": "2020-08-20",
            "service": "CBT",
            "duration": "50",
            "attendance": "Attended",
            "amount": "180",
            "payment": "0"
        }
    ],

	"email": "test0932843092@outlook.com"
}