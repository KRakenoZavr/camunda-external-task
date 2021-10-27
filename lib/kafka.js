const { Kafka } = require("kafkajs");
require("dotenv").config();

const config = {
    brokers: [process.env.KAFKA_SERVER],
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
