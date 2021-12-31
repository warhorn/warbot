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
  let message, args, context, instruction;

  beforeEach(() => {
    message = {
      author: {
        send: jest.fn(),
      },
      channel: {
        sendTyping: jest.fn(),
      },
    };
    args = ["bionic-dwarf"];
    context = {};
    instruction = new EventCalendarInstruction(message, args, context);
  });

  test("sends a typing event to the channel", async () => {
    await instruction.execute();

    expect(message.channel.sendTyping).toHaveBeenCalled();
  });

  test("fetches the event calendar", async () => {
    await instruction.execute();

    expect(warhorn.fetchEventCalendar).toHaveBeenCalled();
  });

  test("sends a reply message", async () => {
    await instruction.execute();

    expect(message.author.send).toHaveBeenCalled();
  });
});
