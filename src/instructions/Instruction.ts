import BaseInstruction from "./BaseInstruction";
import EventCalendarInstruction from "./EventCalendarInstruction";
import FeatureFlagInstruction from "./FeatureFlagInstruction";

const TOKEN_WHITESPACE_REGEX = /\s+/;

class Instruction {
  static apply(content: string): BaseInstruction | null {
    // per https://github.com/meew0/discord-bot-best-practices, if the user sends an
    // instruction that doesn't exist, just fail silently

    const [instructionPrefix, ...args] = content
      .trim()
      .split(TOKEN_WHITESPACE_REGEX);
    switch (instructionPrefix) {
      case EventCalendarInstruction.Prefix:
        return new EventCalendarInstruction(args);
      case FeatureFlagInstruction.Prefix:
        return new FeatureFlagInstruction(args);
      default:
        return null;
    }
  }
}

export default Instruction;
