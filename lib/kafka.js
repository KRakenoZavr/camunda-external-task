const { Kafka } = require("kafkajs");
require("dotenv").config();

const {
    KAFKA_BROKERS,
    KAFKA_CLIENT_ID,
    KAFKA_USERNAME,
    KAFKA_PASSWORD,
} = process.env;

const config = {
    clientId: KAFKA_CLIENT_ID,
    brokers: KAFKA_BROKERS.split(","),
    sasl: {
        mechanism: "plain", // scram-sha-256 or scram-sha-512
        username: KAFKA_USERNAME,
        password: KAFKA_PASSWORD,
    },
};

const state = {
    producer: null,
};

const connectKafka = async () => {
    const kafka = new Kafka(config);
    state.producer = kafka.producer();

    console.log("kafka: connect try");
    await state.producer.connect();
    console.log("kafka: connected");
};

const getProducer = () => state.producer;

const sendMessage = async (topic, msg) => {
    const producer = getProducer();

    await producer.send({
        topic: topic,
        messages: [
            {
                value: JSON.stringify(msg),
            },
        ],
    });
};

module.exports = {
    connectKafka,
    getProducer,
    sendMessage,
};
