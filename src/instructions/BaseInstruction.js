"use strict";

class BaseInstruction {
  constructor(args) {
    this.args = args;
  }

  async execute() {
    throw "Method unimplemented";
  }

  prefix() {
    throw "Method unimplemented";
  }

  toString() {
    if (this.args.length === 0) return this.prefix();
    return `${this.prefix()} ${this.args.join(" ")}`;
  }
}

module.exports = BaseInstruction;
