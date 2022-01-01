export type BotConfig = {
  discordToken: string;
  warhornToken: string;
  warhornEndpointUrl: string;
  warhornWebBaseUrl: string;
};

const config: BotConfig = {
  discordToken: process.env.DISCORD_BOT_TOKEN || "",
  warhornToken: process.env.WARHORN_APP_TOKEN || "",
  warhornEndpointUrl: process.env.WARHORN_GRAPHQL_URL || "",
  warhornWebBaseUrl: process.env.WARHORN_WEB_URL || "",
};

export default config;
