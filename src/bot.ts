import { Client, Intents, Constants } from "discord.js";

import ChannelMessageEventHandler from "./events/ChannelMessageEventHandler";
import config from "./util/config";
import DirectMessageEventHandler from "./events/DirectMessageEventHandler";
import logger from "./util/logger";

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
  Constants.PartialTypes.CHANNEL, // https://github.com/discordjs/discord.js/issues/5516
];

class Bot {
  client: Client;

  constructor() {
    this.client = new Client({
      intents: INTENTS,
      partials: PARTIALS,
    });

    this.client.once("ready", () => {
      if (this.client.user) {
        logger.info(`Logged into Discord as '${this.client.user.tag}'`);
      }
    });

    this.client.on("messageCreate", async (message) => {
      switch (message.channel.type) {
        case "DM":
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

export default Bot;
