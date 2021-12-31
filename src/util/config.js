"use strict";

const config = {
  discordToken: process.env.DISCORD_BOT_TOKEN,
  warhornToken: process.env.WARHORN_APP_TOKEN,
  warhornEndpointUrl: process.env.WARHORN_GRAPHQL_URL,
  warhornWebBaseUrl: process.env.WARHORN_WEB_URL,
};

module.exports = config;
