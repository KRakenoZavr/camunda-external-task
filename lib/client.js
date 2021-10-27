const { Client, logger } = require("camunda-external-task-client-js");
require("dotenv").config();

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = {
    baseUrl: process.env.CAMUNDA_ENGINE,
    use: logger,
    asyncResponseTimeout: 10000,
};

// create a Client instance with custom configuration
function connectClient() {
    return new Client(config);
}

module.exports = {
    connectClient,
};
