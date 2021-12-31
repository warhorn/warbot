import { Message } from "discord.js";
import { v4 as uuidv4 } from "uuid";

import {
  ExecutionContext,
  MessageResponder,
} from "../instructions/BaseInstruction";
import Instruction from "../instructions/Instruction";
import logger from "../util/logger";

class DirectMessageEventHandler {
  static async handle(message: Message) {
    const handlerLogger = logger.child({
      on: "messageCreate",
      request_id: uuidv4(),
      sender: message.author.tag,
      type: "DirectMessage",
    });

    const instruction = Instruction.apply(message.content);
    if (!instruction) return;

    // TODO: validate instruction before executing, replying with usage info when invalid

    const context: ExecutionContext = { logger: handlerLogger };
    const responder: MessageResponder = {
      respond: (response) => message.author.send(response),
      sendTyping: () => message.channel.sendTyping(),
    };
    let status;
    try {
      await instruction.execute(context, responder);
      status = "OK";
    } catch (err) {
      // TODO: distinguish between transient/retriable errors (network blip) and
      // permanent errors (syntax error)
      handlerLogger.error("Error executing instruction", { err });
      status = "ERR";

      message.author.send(
        "Oops! Something went wrong when executing your instruction. Check the syntax of your message and try again."
      );
    }

    handlerLogger.info(`[${status}] ${instruction}`, {
      instruction: instruction.toString(),
      status,
    });
  }
}

export default DirectMessageEventHandler;
