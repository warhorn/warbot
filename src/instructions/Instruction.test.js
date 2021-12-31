const Instruction = require("./Instruction");
const EventCalendarInstruction = require("./EventCalendarInstruction");

describe("apply", () => {
  let content;

  describe("with an event calendar instruction", () => {
    beforeEach(() => {
      content = "event-calendar bionic-dwarf";
    });

    test("returns an EventCalendarInstruction", () => {
      const instruction = Instruction.apply(content);

      expect(instruction.prefix()).toEqual(EventCalendarInstruction.Prefix);
    });
  });

  describe("with an unsupported instruction", () => {
    beforeEach(() => {
      content = "foobar";
    });

    test("returns null", () => {
      const instruction = Instruction.apply(content);

      expect(instruction).toBeNull();
    });
  });
});
