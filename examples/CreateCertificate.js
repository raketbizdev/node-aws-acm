// Import necessary modules
const ACMManager = require("../ACMManager");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config({ path: __dirname + "/.env" });

// Create an instance of the ACMManager class
const acm = new ACMManager();

// Set the domain name for which to create the certificate
const domainName = "test.example.com";

// Define the parameters for creating the certificate
const createCertificateParams = {
  DomainName: domainName,
  ValidationMethod: "DNS",
  SubjectAlternativeNames: ["app.example.com"],
  Tags: [
    {
      Key: "Name",
      Value: `*.${domainName}`,
    },
    {
      Key: "Environment",
      Value: "Production",
    },
  ],
};

// Define the parameters for validating the certificate
const validateCertificateParams = {
  CertificateArn: "",
};

// Call the createCertificateForDomain method to create the certificate
acm.createCertificateForDomain(
  domainName,
  createCertificateParams,
  (err, data) => {
    if (err) {
      console.log(`Error creating certificate: ${err.message}`);
    } else {
      console.log(JSON.stringify({ certificateArn: data }, null, 2));
      // Set the certificate ARN in the validation parameters
      validateCertificateParams.CertificateArn = data;
      // Call the validateCertificate method to validate the certificate
      acm.validateCertificate(validateCertificateParams, (err, data) => {
        if (err) {
          console.log(`Error validating certificate: ${err.message}`);
        } else {
          console.log(JSON.stringify({ certificateValidation: data }, null, 2));
        }
      });
    }
  }
);

// Run the script using the command: node CreateCertificate.js
