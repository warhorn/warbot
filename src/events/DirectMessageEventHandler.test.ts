import { Message } from "discord.js";

import BaseInstruction, {
  ExecutionContext,
  MessageResponder,
} from "../instructions/BaseInstruction";
import DirectMessageEventHandler from "./DirectMessageEventHandler";
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
          send: (content: string) => Promise.resolve({} as Message),
          tag: "warhorn@12345",
        },
      } as Message;
      instruction = new TestInstruction(["foobar"]);
      jest.spyOn(Instruction, "apply").mockImplementation(() => instruction);
      jest
        .spyOn(message.author, "send")
        .mockImplementation(() => Promise.resolve({} as Message));
    });

    describe("when execution succeeds", () => {
      beforeEach(() => {
        jest
          .spyOn(instruction, "execute")
          .mockImplementation(() => Promise.resolve());
      });

      test("executes the instruction", async () => {
        await DirectMessageEventHandler.handle(message);

        expect(instruction.execute).toHaveBeenCalled();
      });

      test("does not send an error message", async () => {
        await DirectMessageEventHandler.handle(message);

        expect(message.author.send).not.toHaveBeenCalled();
      });
    });

    describe("when execution fails", () => {
      beforeEach(() => {
        jest.spyOn(instruction, "execute").mockImplementation(() => {
          throw "Oops!";
        });
      });

      test("sends an error message", async () => {
        await DirectMessageEventHandler.handle(message);

        expect(message.author.send).toHaveBeenCalled();
      });
    });
  });
});
