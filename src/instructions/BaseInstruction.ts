import winston from "winston";

export type ExecutionContext = {
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

  prefix(): string {
    throw "Method unimplemented";
  }

  toString(): string {
    if (this.args.length === 0) return this.prefix();
    return `${this.prefix()} ${this.args.join(" ")}`;
  }
}

export default BaseInstruction;
