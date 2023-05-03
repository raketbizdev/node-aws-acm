// This file exports the three classes related to ACM operations: ACMAutoConnect, ACMManager, and ACMDeleter

const ACMAutoConnect = require("./ACMAutoConnect");
const ACMManager = require("./ACMManager");
const ACMDeleter = require("./ACMDeleter");

module.exports = {
  ACMAutoConnect, // The ACMAutoConnect class encapsulates methods for listing ACM certificates
  ACMManager, // The ACMManager class encapsulates methods for creating and validating ACM certificates
  ACMDeleter, // The ACMDeleter class encapsulates methods for deleting ACM certificates
};
