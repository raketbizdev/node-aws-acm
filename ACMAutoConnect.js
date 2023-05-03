const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

class ACMAutoConnect {
  constructor() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;

    this._configureAWS(accessKeyId, secretAccessKey, region);
    this.acm = new AWS.ACM();
  }

  _configureAWS(accessKeyId, secretAccessKey, region) {
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });
  }

  async listCertificates() {
    try {
      const result = await this.acm.listCertificates().promise();
      return result.CertificateSummaryList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = ACMAutoConnect;
