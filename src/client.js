import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { createClient } from 'graphql-ws';
import { createLink } from "apollo-absinthe-upload-link";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createAuthLink } from './createAuthLink';
import { hasSubscription } from "@jumpn/utils-graphql";
import { onError } from '@apollo/client/link/error';

const HTTP_ENDPOINT = "http://localhost:4000/api";
const WS_ENDPOINT = "ws://localhost:4000/api/graphql-ws";

// Create an HTTP link to the Phoenix app's HTTP endpoint URL.
const httpLink = createLink({
  uri: HTTP_ENDPOINT
});

// Create a WebSocket link to the Phoenix app's socket URL.
const socketLink = new GraphQLWsLink(createClient({
  url: WS_ENDPOINT
}));

// Create the auth link
const authLink = createAuthLink();

// Create an error link to handle network errors
const errorLink = onError(({ networkError }) => {
  if (networkError) {
    // Redirect to custom 500 page or set state to show 500 error page
    window.location.href = '/500';
  }
});

// Create a link that "splits" requests based on GraphQL operation type.
// Queries and mutations go through the HTTP link.
// Subscriptions go through the WebSocket link.
const link = split(
  operation => hasSubscription(operation.query),
  socketLink,
  errorLink.concat(authLink.concat(httpLink))
);

// Create the Apollo Client instance.
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export default client;
