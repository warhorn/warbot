import { User } from "discord.js";
import winston from "winston";

import Identity from "../warhorn/models/Identity";
import { QueryContext } from "../warhorn/WarhornApiClient";

export type ExecutionContext = {
  author: User;
  logger: winston.Logger;
};

export type MessageResponder = {
  respond: (response: string) => void;
  sendTyping: () => void;
};

class BaseInstruction {
  static Prefix: string;
  args: string[];

  constructor(args: string[]) {
    this.args = args;
  }

  async execute(
    context: ExecutionContext,
    responder: MessageResponder
  ): Promise<void> {
    throw "Method unimplemented";
  }

  makeQueryContext(executionContext: ExecutionContext): QueryContext {
    return {
      caller: { uid: executionContext.author.id } as Identity,
      logger: executionContext.logger,
    };
  }

  prefix(): string {
    throw "Method unimplemented";
  }

  toString(): string {
    if (this.args.length === 0) return this.prefix();
    return `${this.prefix()} ${this.args.join(" ")}`;
  }
}

export default BaseInstruction;
