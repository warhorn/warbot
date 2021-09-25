const { Client, Intents } = require("discord.js");

class Bot {
  constructor(token) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.token = token;

    this.client.once("ready", this.onReady);
    this.client.on("messageCreate", this.onMessageCreate);
  }

  onMessageCreate(msg) {
    if (msg.content === "ping") msg.reply("pong");
  }

  onReady(c) {
    console.log(`Logged in as '${c.user.tag}' and ready for service`);
  }

  start() {
    this.client.login(this.token);
  }
}

module.exports = Bot;
