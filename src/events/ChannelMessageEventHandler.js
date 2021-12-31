"use strict";

const { v4: uuidv4 } = require("uuid");

const { Instruction } = require("../instructions");
const { logger: defaultLogger } = require("../util");

const INSTRUCTION_REGEX = /^!warhorn\s+(?<instruction>.+)$/;

class ChannelMessageEventHandler {
  static async handle(message) {
    const logger = defaultLogger.child({
      channel: message.channel.name,
      on: "messageCreate",
      request_id: uuidv4(),
      sender: message.author.tag,
      type: "ChannelMessage",
    });

    const match = message.content.trim().match(INSTRUCTION_REGEX);
    if (!match) return;

    const instruction = Instruction.apply(match.groups.instruction);
    if (!instruction) return;

    // TODO: validate instruction before executing, replying with usage info when invalid

    let status;
    try {
      await instruction.execute(
        { logger },
        (response) => message.reply(response),
        () => message.channel.sendTyping()
      );
      status = "OK";
    } catch (err) {
      // TODO: distinguish between transient/retriable errors (network blip) and
      // permanent errors (syntax error)
      logger.error("Error executing instruction", { err });
      status = "ERR";

      message.reply(
        "Oops! Something went wrong when executing your instruction. Check the syntax of your message and try again."
      );
    }

    logger.info(`[${status}] ${instruction}`, {
      instruction: instruction.toString(),
      status,
    });
  }
}

module.exports = ChannelMessageEventHandler;
