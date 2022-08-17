import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';

import MatchPage from 'components/pages/AppPage/TournamentPage/PlayPage/MatchPage';
import Spinner from 'components/Spinner';

import { GET_MATCH } from 'graphql/definitions/queries';
import { MatchWithUserInfo } from 'types/types';
import { Page } from 'types/page';

interface IViewMatchPageProps {
  organizationId: string;
}

const ViewMatchPage = ({
  organizationId
}: IViewMatchPageProps): JSX.Element => {
  // todo maybe grab match from props?
  const page = useLocation().pathname;
  const pathMatch = matchPath<{ matchId?: string }>(page, {
    path: Page.ViewMatch,
    exact: false,
    strict: false
  });

  const idFromRoute = pathMatch?.params.matchId;

  const { data, loading } = useQueryWithReconnect<
    {
      getMatch: Nullable<MatchWithUserInfo>;
    },
    { matchId: string }
  >(GET_MATCH, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { matchId: idFromRoute || '' },
    skip: !idFromRoute
  });

  const match = data?.getMatch;

  return loading && !match ? (
    <Spinner />
  ) : match ? (
    <MatchPage match={match} organizationId={organizationId} />
  ) : (
    <div>Match not found</div>
  );
};

export default ViewMatchPage;
