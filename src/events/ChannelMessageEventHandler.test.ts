import { Message } from "discord.js";

import BaseInstruction, {
  ExecutionContext,
  MessageResponder,
} from "../instructions/BaseInstruction";
import ChannelMessageEventHandler from "./ChannelMessageEventHandler";
import Instruction from "../instructions/Instruction";

class TestInstruction extends BaseInstruction {
  async execute(
    context: ExecutionContext,
    responder: MessageResponder
  ): Promise<void> {
    return Promise.resolve();
  }

  prefix() {
    return "test";
  }
}

describe("handle", () => {
  let message: Message, instruction: TestInstruction;

  describe("with a supported instruction", () => {
    beforeEach(() => {
      message = {
        author: {
          tag: "warhorn@12345",
        },
        channel: {
          name: "deadbeef",
        },
        content: "!warhorn foobar baz quux",
        reply: (content: string) => Promise.resolve({} as Message),
      } as Message;
      instruction = new TestInstruction(["foobar baz quux"]);
      jest.spyOn(Instruction, "apply").mockImplementation(() => instruction);
      jest
        .spyOn(message, "reply")
        .mockImplementation(() => Promise.resolve({} as Message));
    });

    describe("when execution succeeds", () => {
      beforeEach(() => {
        jest
          .spyOn(instruction, "execute")
          .mockImplementation(() => Promise.resolve());
      });

      test("executes the instruction", async () => {
        await ChannelMessageEventHandler.handle(message);

        expect(instruction.execute).toHaveBeenCalled();
      });

      test("does not send an error message", async () => {
        await ChannelMessageEventHandler.handle(message);

        expect(message.reply).not.toHaveBeenCalled();
      });
    });

    describe("when execution fails", () => {
      beforeEach(() => {
        jest.spyOn(instruction, "execute").mockImplementation(() => {
          throw "Oops!";
        });
      });

      test("sends an error message", async () => {
        await ChannelMessageEventHandler.handle(message);

        expect(message.reply).toHaveBeenCalled();
      });
    });
  });
});
