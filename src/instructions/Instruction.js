"use strict";

const EventCalendarInstruction = require("./EventCalendarInstruction");

const TOKEN_WHITESPACE_REGEX = /\s+/;

// TODO: prefix is only needed for a channel message without a mention, so move that
// parsing logic into the channel message handler

class Instruction {
  static apply(content) {
    // per https://github.com/meew0/discord-bot-best-practices, if the user sends an
    // instruction that doesn't exist, just fail silently

    const [instructionPrefix, ...args] = content
      .trim()
      .split(TOKEN_WHITESPACE_REGEX);
    if (instructionPrefix === EventCalendarInstruction.Prefix) {
      return new EventCalendarInstruction(args);
    }

    return null;
  }
}

module.exports = Instruction;
