const AWS = require("aws-sdk");
const dotenv = require("dotenv");

class ACMManager {
  constructor() {
    this.acm = new AWS.ACM({ region: process.env.AWS_REGION });
  }

  // Create a new ACM certificate for a given domain name with specified options
  createCertificateForDomain(domainName, options, callback) {
    // Destructure the options object to get the validation method and tags
    const { validationMethod = "DNS", tags = [] } = options;

    // Define the request parameters for creating the certificate
    const params = {
      DomainName: domainName,
      ValidationMethod: validationMethod,
      SubjectAlternativeNames: [`*.${domainName}`],
      Tags: [
        {
          Key: "Name",
          Value: `${domainName}`,
        },
        ...tags,
      ],
    };

    // Check if a certificate already exists for the domain before creating a new one
    this.acm.listCertificates((err, data) => {
      if (err) {
        callback(err);
      } else {
        const certificates = data.CertificateSummaryList;
        const existingCertificate = certificates.find((certificate) => {
          const domains = certificate.DomainName.split(",");
          return (
            domains.includes(domainName) || domains.includes(`*.${domainName}`)
          );
        });

        // If a certificate already exists for the domain, return an error
        if (existingCertificate) {
          const errorMessage = JSON.stringify({
            error: `A certificate already exists for domain '${domainName}'`,
            certificateArn: existingCertificate.CertificateArn,
          });
          callback(new Error(errorMessage));
        } else {
          // If a certificate doesn't exist, create a new one
          this.acm.requestCertificate(params, (err, data) => {
            if (err) {
              callback(err);
            } else if (data && data.CertificateArn) {
              // Return the certificate ARN if the certificate is created successfully
              const certificateArn = data.CertificateArn;
              callback(null, certificateArn);
            } else {
              const message =
                "Unknown error occurred while creating certificate";
              callback(new Error(message));
            }
          });
        }
      }
    });
  }

  // Validate an existing ACM certificate using the certificate ARN
  validateCertificate(params, callback) {
    this.acm.describeCertificate(params, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }
}

module.exports = ACMManager;
