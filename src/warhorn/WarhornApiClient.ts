import { DateTime } from "luxon";
import { gql, GraphQLClient } from "graphql-request";
import winston from "winston";

import FeatureFlagEnablement from "./models/FeatureFlagEnablement";
import Identity from "./models/Identity";
import Session from "./models/Session";

// TODO: sort sessions chronologically
const EVENT_CALENDAR_QUERY = gql`
  query EventCalendar($slug: String!, $startsAfter: ISO8601DateTime) {
    eventSessions(events: [$slug], startsAfter: $startsAfter) {
      nodes {
        name
        scenario {
          name
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

// implicitly executes the mutation as the bot user
const TOGGLE_FEATURE_FLAG_MUTATION = gql`
  mutation ToggleFeatureFlag($input: ToggleFeatureFlagInput!) {
    toggleFeatureFlag(input: $input) {
      enablement {
        feature
        isEnabled
      }
    }
  }
`;

export type QueryContext = {
  caller: Identity;
  logger: winston.Logger;
};

type QueryResult = object;

export type EventCalendarParams = {
  startsAfter?: DateTime;
};

export type EventSessionConnection = {
  nodes: Session[];
};

type EventCalendarQueryResult = {
  eventSessions: EventSessionConnection;
};

type ToggleFeatureFlagResult = {
  toggleFeatureFlag: {
    enablement: FeatureFlagEnablement;
  };
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
  ): Promise<EventSessionConnection> {
    const variables = {
      slug,
      startsAfter: params.startsAfter?.toString(),
    };

    const response = (await this.sendQuery(
      EVENT_CALENDAR_QUERY,
      variables,
      context
    )) as EventCalendarQueryResult;

    return response.eventSessions;
  }

  async toggleFeatureFlag(
    feature: string,
    context: QueryContext
  ): Promise<FeatureFlagEnablement> {
    const variables = {
      input: {
        identityInput: {
          provider: "DISCORD",
          uid: context.caller.uid,
        },
        feature,
      },
    };

    const response = (await this.sendQuery(
      TOGGLE_FEATURE_FLAG_MUTATION,
      variables,
      context
    )) as ToggleFeatureFlagResult;

    return response.toggleFeatureFlag.enablement;
  }

  async sendQuery(
    query: string,
    variables: object,
    context: QueryContext
  ): Promise<QueryResult> {
    context.logger.debug("Sending GraphQL query", { query, variables });

    return await this.graphQLClient.request(query, variables);
  }
}

export default WarhornApiClient;
