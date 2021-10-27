const { connectKafka } = require("./lib/kafka");
const { connectClient } = require("./lib/client");
const { mailWorker, tgWorker } = require("./worker");

async function main() {
    try {
        await connectKafka();

        const client = connectClient();

        // subscribe to the topic: "send-email"
        client.subscribe("send-email", mailWorker);

        // subscribe to the topic: "send-telegram"
        client.subscribe("send-telegram", tgWorker);
    } catch (e) {
        console.error(e);
    }
}

main();
