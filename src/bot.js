const { Client, Intents } = require("discord.js");

class Bot {
  constructor(token) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.token = token;

    this.client.once("ready", () => console.log("Bot is ready for service"));
  }

  start() {
    this.client.login(this.token);
  }
}

module.exports = Bot;
