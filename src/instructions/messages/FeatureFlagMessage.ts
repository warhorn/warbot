import FeatureFlagEnablement from "../../warhorn/models/FeatureFlagEnablement";

class FeatureFlagMessage {
  public static format(enablement: FeatureFlagEnablement): string {
    if (enablement.isEnabled) {
      return `Turned the feature ${enablement.feature} on for you`;
    }

    return `Turned the feature ${enablement.feature} off for you`;
  }
}

export default FeatureFlagMessage;
