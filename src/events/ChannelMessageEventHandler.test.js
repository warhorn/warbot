"use strict";

const ChannelMessageEventHandler = require("./ChannelMessageEventHandler");
const { Instruction } = require("../instructions");

describe("handle", () => {
  let message, instruction;

  describe("with a supported instruction", () => {
    beforeEach(() => {
      message = {
        author: {
          tag: "warhorn@1234",
        },
        channel: {
          name: "deadbeef",
        },
        reply: jest.fn(),
      };
      instruction = {
        execute: jest.fn(),
        toString: () => "foobar",
      };
      jest.spyOn(Instruction, "apply").mockImplementation(() => instruction);
    });

    test("executes the instruction", async () => {
      await ChannelMessageEventHandler.handle(message);

      expect(instruction.execute).toHaveBeenCalled();
    });

    test("does not send an error message", async () => {
      await ChannelMessageEventHandler.handle(message);

      expect(message.reply).not.toHaveBeenCalled();
    });

    describe("when execution fails", () => {
      beforeEach(() => {
        instruction.execute.mockImplementation(() => {
          throw "Oops";
        });
      });

      test("sends an error message", async () => {
        await ChannelMessageEventHandler.handle(message);

        expect(message.reply).toHaveBeenCalled();
      });
    });
  });
});
