type Scenario = {
  name: string;
};

type Venue = {
  name: string;
};

type Slot = {
  startsAt: string;
  venue: Venue | null;
};

type Session = {
  name: string | null;
  scenario: Scenario;
  slot: Slot;
  uuid: string;
};

export default Session;
