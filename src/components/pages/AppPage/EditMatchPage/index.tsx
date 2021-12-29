import React from 'react';

import { MatchWithUserInfo, Tournament } from 'types/types';
import { useParams } from 'react-router-dom';
import { GET_MATCH, GET_TOURNAMENT } from 'graphql/queries/queries';
import MatchPage from 'components/pages/AppPage/TournamentPage/MatchPage';
import Spinner from 'components/Spinner';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';

const EditMatchPage = (): JSX.Element => {
  // todo this can probably be dont better button I cannot think of a good solution and it is 12:16AM
  const { matchId, tournamentId } =
    useParams<{ matchId: string; tournamentId: string }>();

  const { data: tournamentData, loading: tournamentLoading } =
    useQueryWithReconnect<
      {
        getTournament: Nullable<Tournament>;
      },
      { tournamentId: string }
    >(GET_TOURNAMENT, {
      fetchPolicy: 'cache-and-network',
      variables: { tournamentId }
    });

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
  const tournament = tournamentData?.getTournament || null;

  return loading || tournamentLoading ? (
    <Spinner />
  ) : match ? (
    <MatchPage match={match} tournament={tournament} />
  ) : (
    <div>Match not found</div>
  );
};

export default EditMatchPage;
