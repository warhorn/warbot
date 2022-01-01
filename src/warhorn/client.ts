import config from "../util/config";
import WarhornApiClient from "./WarhornApiClient";

const client = new WarhornApiClient(
  config.warhornToken,
  config.warhornEndpointUrl,
  config.warhornWebBaseUrl
);

export default client;
