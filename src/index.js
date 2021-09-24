const { Client, Intents } = require("discord.js");

const config = require("dotenv").config();
if (config.error && process.env.NODE_ENV !== "production") {
  console.error(`Could not load your .env file: ${config.error}`);
  process.exit(1);
}

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => console.log("Ready!"));

client.login(process.env.DISCORD_BOT_TOKEN);
