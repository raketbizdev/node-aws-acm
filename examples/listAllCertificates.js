const ACMAutoConnect = require("../ACMAutoConnect");
require("dotenv").config({ path: "./.env" });

const acm = new ACMAutoConnect();

(async () => {
  const certificates = await acm.listCertificates();
  console.log(certificates);
})();

// node listAllCertificates.js
