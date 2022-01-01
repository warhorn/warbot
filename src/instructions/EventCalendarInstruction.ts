import { DateTime } from "luxon";

import BaseInstruction, {
  ExecutionContext,
  MessageResponder,
} from "./BaseInstruction";
import EventCalendarMessage from "./messages/EventCalendarMessage";
import warhorn from "../warhorn/client";

class EventCalendarInstruction extends BaseInstruction {
  slug: string;

  static Prefix = "event-calendar";

  constructor(args: string[]) {
    super(args);

    this.slug = this.args[0]?.toLowerCase() || "";
  }

  async execute(
    context: ExecutionContext,
    responder: MessageResponder
  ): Promise<void> {
    const startsAfter = DateTime.now();

    responder.sendTyping();

    // TODO: allow user to page through the result set
    const params = { startsAfter };
    const connection = await warhorn.fetchEventCalendar(
      this.slug,
      params,
      context
    );

    const response = EventCalendarMessage.format(this.slug, connection.nodes);
    responder.respond(response);
  }

  prefix() {
    return EventCalendarInstruction.Prefix;
  }
}

export default EventCalendarInstruction;
