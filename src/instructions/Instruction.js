"use strict";

const EventCalendarInstruction = require("./EventCalendarInstruction");

const INSTRUCTION_REGEX = /^!warhorn\s+(?<instruction>.+)$/;
const TOKEN_WHITESPACE_REGEX = /\s+/;

class Instruction {
  static apply(message, context) {
    // per https://github.com/meew0/discord-bot-best-practices, if the user sends an
    // instruction that doesn't exist, just fail silently

    const match = message.content.trim().match(INSTRUCTION_REGEX);
    if (!match) return null;

    const [instructionPrefix, ...args] = match.groups.instruction.split(
      TOKEN_WHITESPACE_REGEX
    );
    if (instructionPrefix === EventCalendarInstruction.Prefix) {
      return new EventCalendarInstruction(message, args, context);
    }

    return null;
  }
}

module.exports = Instruction;
