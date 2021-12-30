"use strict";

const { DateTime } = require("luxon");

const BaseInstruction = require("./BaseInstruction");

class EventCalendarInstruction extends BaseInstruction {
  constructor(message, args) {
    super(message, args);

    this.slug = this.args[0];
  }

  async execute(warhorn) {
    const startsAfter = DateTime.now();

    // TODO: replace with real logging
    console.log(
      `Fetching the calendar for event '${this.slug}' starting after ${startsAfter}`
    );

    this.message.channel.sendTyping();

    // TODO: allow user to page through the result set
    const connection = await warhorn.fetchEventCalendar(this.slug, {
      startsAfter,
    });
    const sessions = connection.nodes;

    // TODO: rich message
    this.message.author.send(JSON.stringify(sessions, undefined, 2));
  }

  prefix() {
    return EventCalendarInstruction.Prefix;
  }
}

EventCalendarInstruction.Prefix = "event-calendar";

module.exports = EventCalendarInstruction;
