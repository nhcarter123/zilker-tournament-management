import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { loader } from 'graphql.macro';
import { setContext } from '@apollo/client/link/context';

import 'index.css';

// todo move this
const serverUrl = 'http://localhost:4000/graphql';

const typeDefs = loader('./graphql/schema.graphql');

const httpLink = createHttpLink({
  uri: serverUrl
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  typeDefs
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
