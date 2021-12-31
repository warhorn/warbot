"use strict";

const { gql, GraphQLClient } = require("graphql-request");

const { logger: defaultLogger } = require("../util");

// TODO: sort sessions chronologically
const EVENT_CALENDAR_QUERY = gql`
  query EventCalendar($slug: String!, $startsAfter: ISO8601DateTime) {
    eventSessions(events: [$slug], startsAfter: $startsAfter) {
      nodes {
        scenario {
          name
        }
        scenarioOffering {
          customName
        }
        slot {
          startsAt
          venue {
            name
          }
        }
        uuid
      }
    }
  }
`;

class WarhornApiClient {
  constructor(appToken, endpointUrl, webBaseUrl) {
    this.graphQLClient = new GraphQLClient(endpointUrl, {
      headers: {
        authorization: `Bearer ${appToken}`,
      },
    });
    this.webBaseUrl = webBaseUrl;
  }

  // TODO: can't just use the default logger since it won't have any of the metadata we
  // set up on the child logger in the messageCreated handler. but passing it explicitly is
  // super awkward. is there some way to put the logger into "thread local" scope during
  // instruction execution so that it doesn't need to be explicitly passed around?

  async fetchEventCalendar(
    slug,
    { startsAfter = null } = {},
    { logger = defaultLogger } = {}
  ) {
    const variables = {
      slug,
      startsAfter: startsAfter?.toString(),
    };

    const data = await this.sendQuery(EVENT_CALENDAR_QUERY, variables, logger);

    return data.eventSessions;
  }

  sendQuery(query, variables, logger) {
    logger.debug("Sending GraphQL query", { query, variables });

    return this.graphQLClient.request(query, variables);
  }
}

module.exports = WarhornApiClient;
