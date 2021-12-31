const EventCalendarInstruction = require("./EventCalendarInstruction");
const { client: warhorn } = require("../warhorn");

const connection = {
  nodes: [],
};

jest.mock("../warhorn/WarhornApiClient", () => {
  return jest.fn().mockImplementation(() => {
    return {
      fetchEventCalendar: jest.fn(() => Promise.resolve(connection)),
    };
  });
});

describe("execute", () => {
  let message, args, context, instruction, responder, sendTyping;

  beforeEach(() => {
    message = {};
    args = ["bionic-dwarf"];
    context = {};
    instruction = new EventCalendarInstruction(message, args);
    responder = jest.fn();
    sendTyping = jest.fn();
  });

  test("sends a typing event to the channel", async () => {
    await instruction.execute(context, responder, sendTyping);

    expect(sendTyping).toHaveBeenCalled();
  });

  test("fetches the event calendar", async () => {
    await instruction.execute(context, responder, sendTyping);

    expect(warhorn.fetchEventCalendar).toHaveBeenCalled();
  });

  test("sends a response message", async () => {
    await instruction.execute(context, responder, sendTyping);

    expect(responder).toHaveBeenCalled();
  });
});
