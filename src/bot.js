"use strict";

const { Client, Intents } = require("discord.js");
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
  constructor(discordToken, warhornToken, warhornUrl) {
    this.client = new Client({
      intents: INTENTS,
      partials: PARTIALS,
    });
    this.discordToken = discordToken;
    this.warhornClient = new WarhornApiClient(warhornToken, warhornUrl);

    // this.client.on("debug", console.log);

    this.client.once("ready", () => {
      console.log(`Logged into Discord as '${this.client.user.tag}'`);
    });

    this.client.on("messageCreate", async (message) => {
      // TODO: if channel message, reply to author in the channel

      const instruction = Instruction.apply(message);
      if (!instruction) return;

      // TODO: validate instruction before executing, replying with usage info when invalid

      try {
        await instruction.execute(this.warhornClient);
      } catch (error) {
        // TODO: distinguish between transient/retriable errors (network blip) and
        // permanent errors (syntax error)
        console.error(`Error executing instruction '${instruction}': ${error}`);

        message.author.send(
          "Oops! Something went wrong when executing your instruction. Check the syntax of your message and try again."
        );
      }
    });
  }

  start() {
    this.client.login(this.discordToken);
  }
}

module.exports = Bot;
