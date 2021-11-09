import { ApolloError } from '@apollo/client';

export const onError = (error: ApolloError): void => {
  console.log(error); // todo add snackbar?
};
