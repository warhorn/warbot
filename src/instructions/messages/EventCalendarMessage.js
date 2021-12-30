"use strict";

const { DateTime } = require("luxon");
const { hideLinkEmbed, time } = require("@discordjs/builders");

class EventCalendarMessage {
  static format(context, sessions) {
    if (sessions.length === 0) {
      return "No upcoming sessions";
    }

    return sessions
      .map((session) => {
        const startsAt = DateTime.fromISO(session.slot.startsAt).toJSDate();
        const title =
          session.scenarioOffering.customName || session.scenario.name;
        const venue = session.slot.venue?.name;
        const url = `${context.baseUrl}/events/${context.slug}/schedule/sessions/${session.uuid}`;
        const link = hideLinkEmbed(url);

        const lines = [time(startsAt), title];
        if (venue) lines.push(venue);
        lines.push(link);

        return lines.join("\n");
      })
      .join("\n\n");
  }
}

module.exports = EventCalendarMessage;
