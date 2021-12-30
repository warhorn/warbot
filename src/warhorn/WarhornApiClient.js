"use strict";

const { gql, GraphQLClient } = require("graphql-request");

const EVENT_CALENDAR_QUERY = gql`
  query EventCalendar($slug: String!, $startsAfter: ISO8601DateTime) {
    eventSessions(events: [$slug], startsAfter: $startsAfter) {
      nodes {
        id
      }
    }
  }
`;

class WarhornApiClient {
  constructor(appToken, endpointUrl) {
    this.graphQLClient = new GraphQLClient(endpointUrl, {
      headers: {
        authorization: `Bearer ${appToken}`,
      },
    });
  }

  async fetchEventCalendar(slug, { startsAfter = null } = {}) {
    const data = await this.sendQuery(EVENT_CALENDAR_QUERY, {
      slug,
      startsAfter: startsAfter?.toString(),
    });

    return data.eventSessions;
  }

  sendQuery(query, variables) {
    return this.graphQLClient.request(query, variables);
  }
}

module.exports = WarhornApiClient;
