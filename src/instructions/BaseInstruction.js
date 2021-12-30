"use strict";

class BaseInstruction {
  constructor(message, args) {
    this.message = message;
    this.args = args;
  }

  async execute() {
    throw "Method unimplemented";
  }

  prefix() {
    throw "Method unimplemented";
  }

  toString() {
    return `${this.prefix()} ${this.args.join(" ")}`;
  }
}

module.exports = BaseInstruction;
