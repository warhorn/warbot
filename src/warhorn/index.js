"use strict";

const { config } = require("../util");
const WarhornApiClient = require("./WarhornApiClient");

module.exports.client = new WarhornApiClient(
  config.warhornToken,
  config.warhornEndpointUrl,
  config.warhornWebBaseUrl
);
