import EventCalendarMessage from "./EventCalendarMessage";
import Session from "../../warhorn/models/Session";

const eventSlug = "deadbeef";

describe("format", () => {
  describe("with no sessions", () => {
    let sessions: Session[];

    beforeEach(() => {
      sessions = [];
    });

    test("renders the empty message", () => {
      const message = EventCalendarMessage.format(eventSlug, sessions);
      expect(message).toMatch("No upcoming sessions");
    });
  });

  describe("with sessions", () => {
    let sessions: Session[];

    beforeEach(() => {
      sessions = [
        {
          name: "My PF Game",
          scenario: {
            name: "PF1 Mod: City of Golden Death",
          },
          slot: {
            startsAt: "2022-01-30T13:00:00-08:00",
            venue: {
              name: "Swedish American Hall",
            },
          },
          uuid: "b835a7d0-1e84-49d8-aa51-cb3d2ce1ec39",
        },
      ];
    });

    test("includes the slot start time as a Discord time", () => {
      const message = EventCalendarMessage.format(eventSlug, sessions);
      expect(message).toMatch("t:1643576400");
    });

    test("includes the session name", () => {
      const message = EventCalendarMessage.format(eventSlug, sessions);
      expect(message).toMatch("My PF Game");
    });

    test("includes the venue name", () => {
      const message = EventCalendarMessage.format(eventSlug, sessions);
      expect(message).toMatch("Swedish American Hall");
    });

    test("includes the schedule url", () => {
      const message = EventCalendarMessage.format(eventSlug, sessions);
      expect(message).toMatch(
        "/events/deadbeef/schedule/sessions/b835a7d0-1e84-49d8-aa51-cb3d2ce1ec39"
      );
    });
  });
});
