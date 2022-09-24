import { ChannelType, Client, GatewayIntentBits, Partials } from "discord.js";

import ChannelMessageEventHandler from "./events/ChannelMessageEventHandler";
import config from "./util/config";
import DirectMessageEventHandler from "./events/DirectMessageEventHandler";
import logger from "./util/logger";

const INTENTS = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.MessageContent,
];

const PARTIALS = [
  Partials.Channel, // required to receive DMs
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
        case ChannelType.DM:
          DirectMessageEventHandler.handle(message);
          break;
        case ChannelType.PrivateThread:
          ChannelMessageEventHandler.handle(message);
          break;
        case ChannelType.PublicThread:
          ChannelMessageEventHandler.handle(message);
          break;
        case ChannelType.GuildText:
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
