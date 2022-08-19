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
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
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

    const cachedVersion = localStorage.getItem('cachedVersion');

    if (cachedVersion && cachedVersion !== clientVersion) {
      location.reload();
    }

    localStorage.setItem('cachedVersion', clientVersion);

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
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY || ''}
    // language={'English'}
    // useRecaptchaNet="[optional_boolean_value]"
    // scriptProps={{
    //   // async: false, // optional, default to false,
    //   // defer: false, // optional, default to false
    //   // appendTo: 'head', // optional, default to "head", can be "head" or "body",
    //   // nonce: undefined // optional, default undefined
    // }}
    // container={{
    //   // optional to render inside custom element
    //   element: '[required_id_or_htmlelement]',
    //   parameters: {
    //     // badge: 'inline', // optional, default undefined
    //     // theme: 'dark' // optional, default undefined
    //   }
    // }}
  >
    <ApolloProvider client={client}>
      <WebsocketContextProvider wsClient={wsClient}>
        <App />
      </WebsocketContextProvider>
    </ApolloProvider>
  </GoogleReCaptchaProvider>,
  document.getElementById('root')
);
