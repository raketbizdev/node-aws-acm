const AWS = require("aws-sdk");
const dotenv = require("dotenv");

class ACMDeleter {
  constructor() {
    // Create an instance of ACM service from AWS SDK
    this.acm = new AWS.ACM({ region: process.env.AWS_REGION });
  }

  // Delete a certificate from ACM based on input
  // Input can be either a domain name or a certificate ARN
  // Calls the provided callback function with an error or data object
  deleteCertificate(input, callback) {
    let params = {};

    // If input is an ARN, use it as the CertificateArn parameter in deleteCertificate API
    if (this._isArn(input)) {
      params.CertificateArn = input;
    } else {
      // If input is a domain name, use it as the DomainName parameter in deleteCertificate API
      params.DomainName = input;
    }

    // Call the deleteCertificate API of ACM service with params object
    this.acm.deleteCertificate(params, (err, data) => {
      if (err) {
        // If certificate is not found for the input, return a message
        if (err.code === "ResourceNotFoundException") {
          callback(null, {
            message: `No certificate found for input '${input}'`,
          });
        } else {
          // If an error occurs other than certificate not found, return the error object
          callback(err);
        }
      } else {
        // If certificate is deleted successfully, return a message
        callback(null, {
          message: `Certificate for input '${input}' has been deleted`,
        });
      }
    });
  }

  // Check if the input is an ARN by checking if it starts with "arn:"
  _isArn(input) {
    return input.startsWith("arn:");
  }
}

module.exports = ACMDeleter;
