import { useContext, useEffect, useState } from 'react';
import {
  DocumentNode,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery
} from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { WebsocketContext } from 'context/websocketContext';

export const useQueryWithReconnect = <TData, TVariables = {}>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: QueryHookOptions<TData, TVariables> | undefined
): QueryResult<TData, TVariables> => {
  const { isOnline } = useContext(WebsocketContext);
  const [wasOnline, setWasOnline] = useState<boolean>(true);

  const queryResult = useQuery<TData, TVariables>(query, {
    ...options,
    onError
  });

  useEffect(() => {
    if (isOnline && !wasOnline && !options?.skip) {
      void queryResult.refetch();
    }

    setWasOnline(isOnline);
  }, [wasOnline, isOnline, queryResult, options]);

  return queryResult;
};
