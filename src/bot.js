"use strict";

const { Client, Intents } = require("discord.js");
const { v4: uuidv4 } = require("uuid");

const { logger } = require("./util");
const { Instruction } = require("./instructions");
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
      // TODO: if channel message, reply to sender in the channel

      const localLogger = logger.child({
        on: "messageCreate",
        request_id: uuidv4(),
        sender: message.author.tag,
        type: "DM",
      });

      const instruction = Instruction.apply(message, {
        logger: localLogger,
        warhorn: this.warhornClient,
      });
      if (!instruction) return;

      // TODO: validate instruction before executing, replying with usage info when invalid

      let status;
      try {
        await instruction.execute();
        status = "OK";
      } catch (err) {
        // TODO: distinguish between transient/retriable errors (network blip) and
        // permanent errors (syntax error)
        localLogger.error("Error executing instruction", { err });
        status = "ERR";

        message.author.send(
          "Oops! Something went wrong when executing your instruction. Check the syntax of your message and try again."
        );
      }

      localLogger.info(`[${status}] ${instruction}`, {
        instruction: instruction.toString(),
        status,
      });
    });
  }

  start() {
    this.client.login(this.discordToken);
  }
}

module.exports = Bot;
