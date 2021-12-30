"use strict";

const BaseInstruction = require("./BaseInstruction");

class EventCalendarInstruction extends BaseInstruction {
  constructor(message, args) {
    super(message, args);

    this.slug = this.args[0];
  }

  async execute(warhorn) {
    // TODO: replace with real logging
    console.log(`Fetching the calendar for event '${this.slug}'`);

    this.message.channel.sendTyping();

    const sessions = await warhorn.fetchEventCalendar(this.slug);
    this.message.author.send(JSON.stringify(sessions, undefined, 2));
  }

  prefix() {
    return EventCalendarInstruction.Prefix;
  }
}

EventCalendarInstruction.Prefix = "event-calendar";

module.exports = EventCalendarInstruction;
