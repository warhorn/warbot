import EventCalendarInstruction from "./EventCalendarInstruction";
import { ExecutionContext, MessageResponder } from "./BaseInstruction";
import logger from "../util/logger";
import warhorn from "../warhorn/client";

const connection = {
  nodes: [],
};

describe("execute", () => {
  let args: string[],
    context: ExecutionContext,
    instruction: EventCalendarInstruction,
    responder: MessageResponder;

  beforeEach(() => {
    args = ["bionic-dwarf"];
    context = { logger };
    instruction = new EventCalendarInstruction(args);
    responder = {
      respond: jest.fn().mockImplementation(() => {}),
      sendTyping: jest.fn(),
    };
    jest
      .spyOn(warhorn, "fetchEventCalendar")
      .mockImplementation(() => Promise.resolve(connection));
  });

  test("sends a typing event to the channel", async () => {
    await instruction.execute(context, responder);

    expect(responder.sendTyping).toHaveBeenCalled();
  });

  test("fetches the event calendar", async () => {
    await instruction.execute(context, responder);

    expect(warhorn.fetchEventCalendar).toHaveBeenCalled();
  });

  test("sends a response message", async () => {
    await instruction.execute(context, responder);

    expect(responder.respond).toHaveBeenCalled();
  });
});
