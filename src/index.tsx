import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { loader } from 'graphql.macro';
import { setContext } from '@apollo/client/link/context';

const typeDefs = loader('./graphql/schema.graphql');

const uploadLink: any = createUploadLink({
  uri: process.env.REACT_APP_SERVER_URL
}); // forced to type as any until @types/apollo-upload-client is updated

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
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
  typeDefs
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
