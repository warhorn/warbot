"use strict";

const { DateTime } = require("luxon");

const BaseInstruction = require("./BaseInstruction");
const { EventCalendarMessage } = require("./messages");

class EventCalendarInstruction extends BaseInstruction {
  constructor(message, args, context) {
    super(message, args);

    this.context = context;
    this.slug = this.args[0];
  }

  async execute() {
    const startsAfter = DateTime.now();

    this.message.channel.sendTyping();

    // TODO: allow user to page through the result set
    const connection = await this.context.warhorn.fetchEventCalendar(
      this.slug,
      {
        startsAfter,
      },
      { logger: this.context.logger }
    );

    const message = EventCalendarMessage.format(
      {
        baseUrl: this.context.warhorn.webBaseUrl,
        eventSlug: this.slug,
      },
      connection.nodes
    );
    this.message.author.send(message);
  }

  prefix() {
    return EventCalendarInstruction.Prefix;
  }
}

EventCalendarInstruction.Prefix = "event-calendar";

module.exports = EventCalendarInstruction;
