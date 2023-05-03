# Node AWS-ACM

A lightweight npm package to interact with AWS Certificate Manager (ACM) using Node.js.

## Description

node-aws-acm is a user-friendly and easy-to-use package for managing SSL/TLS certificates on AWS using the AWS Certificate Manager (ACM). The package provides a simple interface for connecting to ACM, allowing developers to perform various ACM-related tasks such as listing certificates, requesting new certificates, and managing domain validation.

## Use cases

- Automating certificate management tasks in your Node.js applications.
- Building custom tools or services to manage your SSL/TLS certificates on AWS.
- Integrating SSL/TLS certificate management into your existing Node.js projects.

## Prerequisites

You must have the following installed:

- Node.js (version 16 or higher recommended)
- AWS SDK for JavaScript

## Installation

Install node-aws-acm using npm:

```bash
npm install node-aws-acm
```

## Usage

1.  Set up your AWS credentials and region:
    You can set your AWS credentials and region using environment variables:

```bash
export AWS_ACCESS_KEY_ID=your_access_key_id
export AWS_SECRET_ACCESS_KEY=your_secret_access_key
export AWS_REGION=your_region
```

Alternatively, create a `.env` file with the following contents:

```bash
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=your_region
```

Replace your_access_key_id, your_secret_access_key, and your_region with your actual AWS credentials and the desired region.

2. Create a script that uses node-aws-acm to interact with ACM:

```javascript
const ACMAutoConnect = require("node-aws-acm");

const acm = new ACMAutoConnect();

(async () => {
  const certificates = await acm.listCertificates();
  console.log(certificates);
})();
```

This script loads AWS credentials and region from the .env file and lists all SSL/TLS certificates available in your ACM.

Alernatively use `examples` dir to test and check ssl certificates inside AWS ACM
Note: you need to create `.env` file copy from `.env.example` file.

```bash
cd examples
node listAllCertificates.js

// or

// node getSpecificDomainCertificate.js
```

## Documentation

For detailed documentation, refer to the source code and comments in the `node-aws-acm` package.

Additionally, consult the following external resources for more information about AWS SDK and ACM:

- [AWS SDK for JavaScript in Node.js Documentation:](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html) Official documentation for the AWS SDK for JavaScript, including usage examples, best practices, and API reference.
- [AWS Certificate Manager (ACM) Documentation:](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html) Official documentation for AWS Certificate Manager, covering topics such as requesting and managing SSL/TLS certificates, certificate renewal, and domain validation.
  These resources will provide you with in-depth information about using the AWS SDK for JavaScript and working with the AWS Certificate Manager.

## License

This project is licensed under the ISC License.
