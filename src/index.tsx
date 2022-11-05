import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  from,
  split
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createUploadLink } from 'apollo-upload-client';
import { loader } from 'graphql.macro';
import { setContext } from '@apollo/client/link/context';
import WebsocketContextProvider from 'context/websocketContext';
import { RoundPreview } from 'types/types';

const typeDefs = loader('./graphql/schema.graphql');

const wsClient = new SubscriptionClient(process.env.REACT_APP_WS_URI || '', {
  reconnect: true
});

const wsLink = new WebSocketLink(wsClient);

// eslint-disable-next-line
const uploadLink: any = createUploadLink({
  uri: process.env.REACT_APP_SERVER_URI
}); // forced to type as any until @types/apollo-upload-client is updated

const authLink = setContext((_, { headers = {} }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      authorization: (token?.length || 0) > 0 ? `Bearer ${token}` : '',
      ...headers
    }
  };
});

const checkVersionLink = new ApolloLink((operation, forward) => {
  if (Object.keys(forward(operation))[0] === 'subscribe') {
    return forward(operation);
  }

  return forward(operation).map((response) => {
    const context = operation.getContext();
    const clientVersion = context.response.headers.get('client-version');

    if (process.env.REACT_APP_WS_URI !== clientVersion) {
      location.reload();
    }

    return response;
  });
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink
);

const client = new ApolloClient({
  link: from([authLink, checkVersionLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Tournament: {
        fields: {
          rounds: {
            merge(_existing, incoming: RoundPreview[]) {
              return incoming;
            }
          }
        }
      }
    }
  }),
  typeDefs
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <WebsocketContextProvider wsClient={wsClient}>
      <App />
    </WebsocketContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
