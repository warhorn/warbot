"use strict";

const { gql, GraphQLClient } = require("graphql-request");

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

  async fetchEventCalendar(slug, { startsAfter = null } = {}) {
    const variables = {
      slug,
      startsAfter: startsAfter?.toString(),
    };

    const data = await this.sendQuery(EVENT_CALENDAR_QUERY, variables);

    return data.eventSessions;
  }

  sendQuery(query, variables) {
    return this.graphQLClient.request(query, variables);
  }
}

module.exports = WarhornApiClient;
