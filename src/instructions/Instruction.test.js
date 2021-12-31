const Instruction = require("./Instruction");
const EventCalendarInstruction = require("./EventCalendarInstruction");

describe("apply", () => {
  let message, context;

  beforeEach(() => {
    context = {};
  });

  describe("with an instruction without a prefix", () => {
    beforeEach(() => {
      message = {
        content: "bree-yark",
      };
    });

    test("returns null", () => {
      const instruction = Instruction.apply(message, context);

      expect(instruction).toBeNull();
    });
  });

  describe("with an event calendar instruction", () => {
    beforeEach(() => {
      message = {
        content: "!warhorn event-calendar bionic-dwarf",
      };
    });

    test("returns an EventCalendarInstruction", () => {
      const instruction = Instruction.apply(message, context);

      expect(instruction.prefix()).toEqual(EventCalendarInstruction.Prefix);
    });
  });

  describe("with an unsupported instruction", () => {
    beforeEach(() => {
      message = {
        content: "!warhorn foobar",
      };
    });

    test("returns null", () => {
      const instruction = Instruction.apply(message, context);

      expect(instruction).toBeNull();
    });
  });
});
