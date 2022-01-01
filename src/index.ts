import dotenv from "dotenv";

const dotenvConfig = dotenv.config();
if (dotenvConfig.error && process.env.NODE_ENV !== "production") {
  console.error(`Could not load your .env file: ${dotenvConfig.error}`);
  process.exit(1);
}

import Bot from "./bot";

new Bot().start();
