const EventCalendarMessage = require("./EventCalendarMessage");

const context = {
  baseUrl: "http://warhorn.net",
};

describe("format", () => {
  describe("with no sessions", () => {
    let sessions;

    beforeEach(() => {
      sessions = [];
    });

    test("renders the empty message", () => {
      const message = EventCalendarMessage.format(context, sessions);
      expect(message).toMatch("No upcoming sessions");
    });
  });

  describe("with sessions", () => {
    let sessions;

    beforeEach(() => {
      sessions = [
        {
          scenario: {
            name: "PF1 Mod: City of Golden Death",
          },
          scenarioOffering: {
            customName: null,
          },
          slot: {
            startsAt: "2022-01-30T13:00:00-08:00",
            venue: {
              name: "Swedish American Hall",
            },
          },
        },
      ];
    });

    test("includes the slot start time as a Discord time", () => {
      const message = EventCalendarMessage.format(context, sessions);
      expect(message).toMatch("t:1643576400");
    });

    test("includes the scenario name", () => {
      const message = EventCalendarMessage.format(context, sessions);
      expect(message).toMatch(sessions[0].scenario.name);
    });

    test("includes the venue name", () => {
      const message = EventCalendarMessage.format(context, sessions);
      expect(message).toMatch(sessions[0].slot.venue.name);
    });

    test("includes the schedule url", () => {
      const message = EventCalendarMessage.format(context, sessions);
      expect(message).toMatch(
        `/events/${context.slug}/schedule/sessions/${sessions[0].uuid}`
      );
    });
  });
});
