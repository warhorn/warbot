const EventCalendarInstruction = require("./EventCalendarInstruction");
const { client: warhorn } = require("../warhorn");

const connection = {
  nodes: [],
};

describe("execute", () => {
  let message, args, context, instruction, responder, sendTyping, warhornSpy;

  beforeEach(() => {
    message = {};
    args = ["bionic-dwarf"];
    context = {};
    instruction = new EventCalendarInstruction(message, args);
    responder = jest.fn();
    sendTyping = jest.fn();
    warhornSpy = jest
      .spyOn(warhorn, "fetchEventCalendar")
      .mockImplementation(() => Promise.resolve(connection));
  });

  test("sends a typing event to the channel", async () => {
    await instruction.execute(context, responder, sendTyping);

    expect(sendTyping).toHaveBeenCalled();
  });

  test("fetches the event calendar", async () => {
    await instruction.execute(context, responder, sendTyping);

    expect(warhornSpy).toHaveBeenCalled();
  });

  test("sends a response message", async () => {
    await instruction.execute(context, responder, sendTyping);

    expect(responder).toHaveBeenCalled();
  });
});
