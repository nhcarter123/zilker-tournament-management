import React from 'react';

import { MatchWithUserInfo } from 'types/types';
import { useParams } from 'react-router-dom';
import { GET_MATCH } from 'graphql/queries/queries';
import MatchPage from 'components/pages/AppPage/TournamentPage/MatchPage';
import Spinner from 'components/Spinner';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';

const EditMatchPage = (): JSX.Element => {
  const { matchId } = useParams<{ matchId: string }>();

  const { data, loading } = useQueryWithReconnect<
    {
      getMatch: Nullable<MatchWithUserInfo>;
    },
    { matchId: string }
  >(GET_MATCH, {
    fetchPolicy: 'cache-and-network',
    variables: { matchId }
  });

  const match = data?.getMatch;

  return loading ? (
    <Spinner />
  ) : match ? (
    <MatchPage match={match} />
  ) : (
    <div>Match not found</div>
  );
};

export default EditMatchPage;
