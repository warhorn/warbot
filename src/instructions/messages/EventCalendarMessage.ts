import { DateTime } from "luxon";
import { hideLinkEmbed, time } from "@discordjs/builders";

import config from "../../util/config";
import Session from "../../warhorn/models/Session";

class EventCalendarMessage {
  public static format(eventSlug: string, sessions: Session[]): string {
    if (sessions.length === 0) {
      return "No upcoming sessions";
    }

    return sessions
      .map((session) => {
        const startsAt = DateTime.fromISO(session.slot.startsAt).toJSDate();
        const title =
          session.scenarioOffering.customName || session.scenario.name;
        const venue = session.slot.venue?.name;
        const url = `${config.warhornWebBaseUrl}/events/${eventSlug}/schedule/sessions/${session.uuid}`;
        const link = hideLinkEmbed(url);

        const lines = [time(startsAt), title];
        if (venue) lines.push(venue);
        lines.push(link);

        return lines.join("\n");
      })
      .join("\n\n");
  }
}

export default EventCalendarMessage;
