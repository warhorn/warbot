"use strict";

const { Client, Intents } = require("discord.js");

const {
  ChannelMessageEventHandler,
  DirectMessageEventHandler,
} = require("./events");
const { config, logger } = require("./util");

const INTENTS = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGE_TYPING,
];

const PARTIALS = [
  "CHANNEL", // https://github.com/discordjs/discord.js/issues/5516
];

class Bot {
  constructor() {
    this.client = new Client({
      intents: INTENTS,
      partials: PARTIALS,
    });

    this.client.once("ready", () => {
      logger.info(`Logged into Discord as '${this.client.user.tag}'`);
    });

    this.client.on("messageCreate", async (message) => {
      switch (message.channel.type) {
        case "DM":
          DirectMessageEventHandler.handle(message);
          break;
        case "GROUP_DM":
          DirectMessageEventHandler.handle(message);
          break;
        case "GUILD_PRIVATE_THREAD":
          ChannelMessageEventHandler.handle(message);
          break;
        case "GUILD_PUBLIC_THREAD":
          ChannelMessageEventHandler.handle(message);
          break;
        case "GUILD_TEXT":
          ChannelMessageEventHandler.handle(message);
          break;
      }
    });
  }

  start() {
    this.client.login(config.discordToken);
  }
}

module.exports = Bot;
