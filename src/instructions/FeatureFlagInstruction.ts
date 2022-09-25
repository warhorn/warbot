import BaseInstruction, {
  ExecutionContext,
  MessageResponder,
} from "./BaseInstruction";
import FeatureFlagMessage from "./messages/FeatureFlagMessage";
import warhorn from "../warhorn/client";

class FeatureFlagInstruction extends BaseInstruction {
  flag: string;

  static Prefix = "feature";

  constructor(args: string[]) {
    super(args);

    this.flag = this.args[0] || "";
  }

  async execute(
    context: ExecutionContext,
    responder: MessageResponder
  ): Promise<void> {
    responder.sendTyping();

    const enablement = await warhorn.toggleFeatureFlag(
      this.flag,
      this.makeQueryContext(context)
    );

    const message = FeatureFlagMessage.format(enablement);
    responder.respond(message);
  }

  prefix() {
    return FeatureFlagInstruction.Prefix;
  }
}

export default FeatureFlagInstruction;
