const ACMAutoConnect = require("../ACMAutoConnect");
const ACMDeleter = require("../ACMDeleter");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

const acmAutoConnect = new ACMAutoConnect();
const acmDeleter = new ACMDeleter();

// Input can be either a domain name or a certificate ARN
// ARN: arn:aws:acm:us-east-1:358132463944:certificate/84457b6c-2b2b-47b3-83e4-97358c5bd7e7
// Domain: example.com
const domainOrArn = "app.example.com";

async function deleteCertificateForDomainOrArn(domainOrArn) {
  try {
    // Get all certificates
    const certificates = await acmAutoConnect.listCertificates();

    // Find the certificate with the given domain or ARN
    const certificate = certificates.find((certificate) => {
      return (
        certificate.CertificateArn === domainOrArn ||
        certificate.DomainName === domainOrArn
      );
    });

    // If no certificate was found, throw an error
    if (!certificate) {
      const message = `No certificate found for domain '${domainOrArn}'`;
      throw new Error(message);
    }

    // Get the certificate ARN
    const certificateArn = certificate.CertificateArn;

    // Delete the certificate
    acmDeleter.deleteCertificate(certificateArn, (err, data) => {
      if (err) {
        console.log(`Error deleting certificate: ${err.message}`);
      } else {
        console.log(`Certificate deleted: ${JSON.stringify(data)}`);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

deleteCertificateForDomainOrArn(domainOrArn);

// node DeleteDomainCertificate.js
