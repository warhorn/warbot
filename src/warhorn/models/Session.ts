type Scenario = {
  name: string;
};

type ScenarioOffering = {
  customName: string | null;
};

type Venue = {
  name: string;
};

type Slot = {
  startsAt: string;
  venue: Venue | null;
};

type Session = {
  scenario: Scenario;
  scenarioOffering: ScenarioOffering;
  slot: Slot;
  uuid: string;
};

export default Session;
