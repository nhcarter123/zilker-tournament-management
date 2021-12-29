import { useEffect, useState } from 'react';

import {
  DocumentNode,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery
} from '@apollo/client';
import useOnlineStatus from '@rehooks/online-status';

export const useQueryWithReconnect = <TData, TVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: QueryHookOptions<TData, TVariables> | undefined
): QueryResult<TData, TVariables> => {
  const [status, setStatus] = useState(true);
  const onlineStatus: boolean = useOnlineStatus();

  const queryResult = useQuery<TData, TVariables>(query, options);

  useEffect(() => {
    if (!status && onlineStatus) {
      void queryResult.refetch();
    }

    setStatus(onlineStatus);
  }, [status, onlineStatus, queryResult]);

  return queryResult;
};
