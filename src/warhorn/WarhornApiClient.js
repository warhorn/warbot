"use strict";

const { gql, GraphQLClient } = require("graphql-request");

const EVENT_CALENDAR_QUERY = gql`
  query EventCalendar($slug: String!) {
    eventSessions(events: [$slug]) {
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

  async fetchEventCalendar(slug) {
    const data = await this.sendQuery(EVENT_CALENDAR_QUERY, {
      slug,
    });
    return data.eventSessions.nodes;
  }

  sendQuery(query, variables) {
    return this.graphQLClient.request(query, variables);
  }
}

module.exports = WarhornApiClient;
