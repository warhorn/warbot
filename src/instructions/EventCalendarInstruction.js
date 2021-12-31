"use strict";

const { DateTime } = require("luxon");

const BaseInstruction = require("./BaseInstruction");
const { client: warhorn } = require("../warhorn");
const { EventCalendarMessage } = require("./messages");

class EventCalendarInstruction extends BaseInstruction {
  constructor(args) {
    super(args);

    this.slug = this.args[0];
  }

  async execute(context, responder, sendTyping) {
    const startsAfter = DateTime.now();

    sendTyping();

    // TODO: allow user to page through the result set
    const connection = await warhorn.fetchEventCalendar(
      this.slug,
      {
        startsAfter,
      },
      context
    );

    const response = EventCalendarMessage.format(this.slug, connection.nodes);
    responder(response);
  }

  prefix() {
    return EventCalendarInstruction.Prefix;
  }
}

EventCalendarInstruction.Prefix = "event-calendar";

module.exports = EventCalendarInstruction;
