const EventCalendarInstruction = require("./EventCalendarInstruction");

describe("execute", () => {
  let connection, message, args, context, instruction;

  beforeEach(() => {
    connection = {
      nodes: [],
    };
    message = {
      author: {
        send: jest.fn(),
      },
      channel: {
        sendTyping: jest.fn(),
      },
    };
    args = ["bionic-dwarf"];
    context = {
      warhorn: {
        fetchEventCalendar: jest.fn(() => Promise.resolve(connection)),
        webBaseUrl: "https://warhorn.net",
      },
    };
    instruction = new EventCalendarInstruction(message, args, context);
  });

  test("sends a typing event to the channel", async () => {
    await instruction.execute();

    expect(message.channel.sendTyping).toHaveBeenCalled();
  });

  test("fetches the event calendar", async () => {
    await instruction.execute();

    expect(context.warhorn.fetchEventCalendar).toHaveBeenCalled();
  });

  test("sends a reply message", async () => {
    await instruction.execute();

    expect(message.author.send).toHaveBeenCalled();
  });
});
