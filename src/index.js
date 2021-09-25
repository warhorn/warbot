const config = require("dotenv").config();
if (config.error && process.env.NODE_ENV !== "production") {
  console.error(`Could not load your .env file: ${config.error}`);
  process.exit(1);
}

const Bot = require("./bot");
const bot = new Bot(process.env.DISCORD_BOT_TOKEN);
bot.start();