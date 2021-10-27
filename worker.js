const { sendMessage } = require("./lib/kafka");

async function mailWorker({ task, taskService }) {
    console.log("worker: got mailing message");
    const to = task.variables.get("_to");
    const subject = task.variables.get("_subject");
    const text = task.variables.get("_text");
    const photos = task.variables.get("_photos");

    try {
        await sendMessage("send-email", {
            to, subject, text, photos,
        });
    } catch (e) {
        console.log(e);
    }

    console.log("worker: message sent to kafka");

    // Complete the task
    await taskService.complete(task);
}

async function tgWorker({ task, taskService }) {
    console.log("worker: got tg message");
    const tags = task.variables.get("_tags");
    const text = task.variables.get("_text");
    const photos = task.variables.get("_photos");

    await sendMessage("send-telegram", {
        tags, text, photos,
    });

    console.log("worker: message sent to kafka");

    // Complete the task
    await taskService.complete(task);
}

module.exports = {
    mailWorker,
    tgWorker,
};
