"use strict";

const { Client, Intents } = require("discord.js");

const { DirectMessageEventHandler } = require("./events");
const { logger } = require("./util");
const { WarhornApiClient } = require("./warhorn");

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
  constructor(
    discordToken,
    warhornToken,
    warhornEndpointUrl,
    warhornWebBaseUrl
  ) {
    this.client = new Client({
      intents: INTENTS,
      partials: PARTIALS,
    });
    this.discordToken = discordToken;
    this.warhornClient = new WarhornApiClient(
      warhornToken,
      warhornEndpointUrl,
      warhornWebBaseUrl
    );

    this.client.once("ready", () => {
      logger.info(`Logged into Discord as '${this.client.user.tag}'`);
    });

    this.client.on("messageCreate", async (message) => {
      if (message.channel.type === "DM") {
        DirectMessageEventHandler.handle(this.warhornClient, message);
      } else {
        // TODO: reply to sender in the channel
      }
    });
  }

  start() {
    this.client.login(this.discordToken);
  }
}

module.exports = Bot;
