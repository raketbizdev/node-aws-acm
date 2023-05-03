// Import the AWS SDK and the dotenv library for handling environment variables
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

// Load environment variables from a .env file in the same directory
dotenv.config();

// Define the ACMAutoConnect class
class ACMAutoConnect {
  constructor() {
    // Retrieve AWS credentials and region from environment variables
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;

    // Configure AWS credentials and region
    this._configureAWS(accessKeyId, secretAccessKey, region);

    // Create an instance of the AWS ACM service using the configured credentials and region
    this.acm = new AWS.ACM({ apiVersion: "2015-12-08" });
  }

  // Configure the AWS SDK with the provided credentials and region
  _configureAWS(accessKeyId, secretAccessKey, region) {
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });
  }

  // List all ACM certificates associated with the AWS account
  async listCertificates(params = {}) {
    try {
      // Call the ACM listCertificates API and wait for the response
      const result = await this.acm.listCertificates(params).promise();
      // Extract and return the certificate summary list from the response
      return result.CertificateSummaryList;
    } catch (error) {
      // If an error occurs, log it and return an empty array
      console.error(error);
      return [];
    }
  }
}

// Export the ACMAutoConnect class for use in other modules
module.exports = ACMAutoConnect;
