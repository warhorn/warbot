"use strict";

const dotenv = require("dotenv").config();
if (dotenv.error && process.env.NODE_ENV !== "production") {
  console.error(`Could not load your .env file: ${dotenv.error}`);
  process.exit(1);
}

const Bot = require("./bot");
new Bot().start();
