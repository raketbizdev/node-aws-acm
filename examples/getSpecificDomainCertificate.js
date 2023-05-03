const ACMAutoConnect = require("../ACMAutoConnect");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

const domainName = process.env.DOMAIN_NAME;

const acm = new ACMAutoConnect();

(async () => {
  const certificates = await acm.listCertificates();
  const targetCertificate = certificates.find(
    (cert) => cert.DomainName === domainName
  );

  if (!targetCertificate) {
    console.error(`No certificate found for the domain: ${domainName}`);
    return;
  }

  console.log(`Certificate for ${domainName}:`, targetCertificate);
})();

// node getSpecificDomainCertificate.js
