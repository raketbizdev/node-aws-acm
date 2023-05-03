// Import the ACMAutoConnect module and load environment variables
const ACMAutoConnect = require("../ACMAutoConnect");
require("dotenv").config({ path: "./.env" });

// Create a new instance of ACMAutoConnect
const acm = new ACMAutoConnect();

// Use an async IIFE to wait for the listCertificates() method to complete
(async () => {
  // Call the listCertificates() method to retrieve all ACM certificates
  const certificates = await acm.listCertificates();
  console.log(certificates);
})();

// Usage: node listAllCertificates.js
