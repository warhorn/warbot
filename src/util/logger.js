"use strict";

const ecsFormat = require("@elastic/ecs-winston-format");
const winston = require("winston");

const logger = winston.createLogger({
  format: ecsFormat(),
  level: "info",
  transports: [new winston.transports.Console()],
});

module.exports = logger;
