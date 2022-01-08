import { useCallback, useEffect, useState } from 'react';
import {
  DocumentNode,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery
} from '@apollo/client';
import useOnlineStatus from '@rehooks/online-status';
import { onError } from '../graphql/errorHandler';

export const useQueryWithReconnect = <TData, TVariables = {}>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: QueryHookOptions<TData, TVariables> | undefined
): QueryResult<TData, TVariables> => {
  const [retry, setRetry] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(true);
  const onlineStatus: boolean = useOnlineStatus();

  const queryResult = useQuery<TData, TVariables>(query, {
    ...options,
    onError
  });

  const reconnect = useCallback(
    () =>
      setTimeout(
        () =>
          queryResult
            .refetch()
            .then(() => setRetry(0))
            .catch(() => {
              if (retry < 5) {
                setRetry(retry + 1);
                reconnect();
              } else {
                setRetry(0);
              }
            }),
        2000
      ),
    [queryResult, retry, setRetry]
  );

  useEffect(() => {
    if (!status && onlineStatus) {
      reconnect();
    }

    setStatus(onlineStatus);
  }, [reconnect, status, onlineStatus, queryResult]);

  return queryResult;
};
