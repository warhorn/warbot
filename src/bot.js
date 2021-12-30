const { Client, Intents } = require("discord.js");

class Bot {
  constructor(token) {
    this.client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
      ],
      // https://github.com/discordjs/discord.js/issues/5516
      partials: ["CHANNEL"],
    });
    this.token = token;

    // this.client.on("debug", console.log);

    this.client.once("ready", () => {
      console.log(
        `Bot is logged in as '${this.client.user.tag}' && ready for service`
      );
    });

    this.client.on("messageCreate", (message) => {
      console.log(
        `messageCreate: ${message.author.tag} said '${message.content}'`
      );
    });
  }

  start() {
    this.client.login(this.token);
  }
}

module.exports = Bot;
