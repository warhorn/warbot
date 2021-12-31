import dotenv from "dotenv";

import Bot from "./bot";

const dotenvConfig = dotenv.config();
if (dotenvConfig.error && process.env.NODE_ENV !== "production") {
  console.error(`Could not load your .env file: ${dotenvConfig.error}`);
  process.exit(1);
}

new Bot().start();
