// Require the necessary packages and files
const ACMAutoConnect = require("../ACMAutoConnect");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config({ path: __dirname + "/.env" });

// Set the domain name to search for as an environment variable
const domainName = process.env.DOMAIN_NAME;

// Instantiate a new ACM Auto Connect object
const acm = new ACMAutoConnect();

// Use an immediately-invoked async function to list certificates and find the target certificate
(async () => {
  try {
    // Call the listCertificates method to get a list of all certificates
    const certificates = await acm.listCertificates();

    // Use the find method to locate the target certificate by domain name
    const targetCertificate = certificates.find(
      (cert) => cert.DomainName === domainName
    );

    // If no certificate was found, log an error message and return
    if (!targetCertificate) {
      console.error(`No certificate found for the domain: ${domainName}`);
      return;
    }

    // Log the target certificate object to the console
    console.log(`Certificate for ${domainName}:`, targetCertificate);
  } catch (error) {
    // Log any errors that occur
    console.error(error.message);
  }
})();

// To run the script, use the following command:
// node getSpecificDomainCertificate.js
