import { DateTime } from "luxon";
import { gql, GraphQLClient } from "graphql-request";
import winston from "winston";

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

export type EventCalendarParams = {
  startsAfter?: DateTime;
};

export type QueryContext = {
  logger: winston.Logger;
};

class WarhornApiClient {
  graphQLClient: GraphQLClient;
  webBaseUrl: string;

  constructor(appToken: string, endpointUrl: string, webBaseUrl: string) {
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
    slug: string,
    params: EventCalendarParams = {},
    context: QueryContext
  ): Promise<any> {
    const variables = {
      slug,
      startsAfter: params.startsAfter?.toString(),
    };

    const data = await this.sendQuery(EVENT_CALENDAR_QUERY, variables, context);

    return data.eventSessions;
  }

  sendQuery(
    query: string,
    variables: object,
    context: QueryContext
  ): Promise<any> {
    context.logger.debug("Sending GraphQL query", { query, variables });

    return this.graphQLClient.request(query, variables);
  }
}

export default WarhornApiClient;
