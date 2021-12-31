"use strict";

const DirectMessageEventHandler = require("./DirectMessageEventHandler");
const { Instruction } = require("../instructions");

describe("handle", () => {
  let warhorn, message, instruction;

  describe("with a supported instruction", () => {
    beforeEach(() => {
      warhorn = {};
      message = {
        author: {
          send: jest.fn(),
          tag: "warhorn@1234",
        },
      };
      instruction = {
        execute: jest.fn(),
        toString: () => "foobar",
      };
      jest.spyOn(Instruction, "apply").mockImplementation(() => instruction);
    });

    test("executes the instruction", async () => {
      await DirectMessageEventHandler.handle(warhorn, message);

      expect(instruction.execute).toHaveBeenCalled();
    });

    test("does not send an error message", async () => {
      await DirectMessageEventHandler.handle(warhorn, message);

      expect(message.author.send).not.toHaveBeenCalled();
    });

    describe("when execution fails", () => {
      beforeEach(() => {
        instruction.execute.mockImplementation(() => {
          throw "Oops";
        });
      });

      test("sends an error message", async () => {
        await DirectMessageEventHandler.handle(warhorn, message);

        expect(message.author.send).toHaveBeenCalled();
      });
    });
  });
});
