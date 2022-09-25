import FeatureFlagEnablement from "../../warhorn/models/FeatureFlagEnablement";
import FeatureFlagMessage from "./FeatureFlagMessage";

const feature = "deadbeef";

describe("format", () => {
  describe("when the feature is disabled", () => {
    const enablement: FeatureFlagEnablement = { feature, isEnabled: false };

    test("formats the off message", () => {
      const message = FeatureFlagMessage.format(enablement);
      expect(message).toMatch(`Turned the feature ${feature} off for you`);
    });
  });

  describe("when the feature is enabled", () => {
    const enablement: FeatureFlagEnablement = { feature, isEnabled: true };

    test("formats the on message", () => {
      const message = FeatureFlagMessage.format(enablement);
      expect(message).toMatch(`Turned the feature ${feature} on for you`);
    });
  });
});
