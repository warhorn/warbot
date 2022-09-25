import { User } from "discord.js";

import FeatureFlagEnablement from "../warhorn/models/FeatureFlagEnablement";
import FeatureFlagInstruction from "./FeatureFlagInstruction";
import { ExecutionContext, MessageResponder } from "./BaseInstruction";
import logger from "../util/logger";
import warhorn from "../warhorn/client";

const author = {} as User;
const enablement = {} as FeatureFlagEnablement;

describe("execute", () => {
  let args: string[],
    context: ExecutionContext,
    instruction: FeatureFlagInstruction,
    responder: MessageResponder;

  beforeEach(() => {
    args = ["a-flag"];
    context = { author, logger };
    instruction = new FeatureFlagInstruction(args);
    responder = {
      respond: jest.fn().mockImplementation(() => {}),
      sendTyping: jest.fn(),
    };
    jest
      .spyOn(warhorn, "toggleFeatureFlag")
      .mockImplementation(() => Promise.resolve(enablement));
  });

  test("sends a typing event to the channel", async () => {
    await instruction.execute(context, responder);

    expect(responder.sendTyping).toHaveBeenCalled();
  });

  test("fetches the event calendar", async () => {
    await instruction.execute(context, responder);

    expect(warhorn.toggleFeatureFlag).toHaveBeenCalled();
  });

  test("sends a response message", async () => {
    await instruction.execute(context, responder);

    expect(responder.respond).toHaveBeenCalled();
  });
});
