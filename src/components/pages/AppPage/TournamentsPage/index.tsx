import React from 'react';

import { Box } from '@mui/material';
import JoinTournamentList from 'components/pages/AppPage/TournamentsPage/JoinTournamentList';
import Spinner from 'components/Spinner';

import { GET_TOURNAMENTS } from 'graphql/queries/queries';

import {
  Tournament,
  TournamentStatus,
  TournamentUpdatedData,
  TournamentUpdatedVariables
} from 'types/types';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';
import { useSubscription } from '@apollo/client';
import { TOURNAMENT_UPDATED } from 'graphql/subscriptions/subscriptions';

const TournamentsPage = (): JSX.Element => {
  const { data, loading } = useQueryWithReconnect<{
    getTournaments: Tournament[];
  }>(GET_TOURNAMENTS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  useSubscription<TournamentUpdatedData, TournamentUpdatedVariables>(
    TOURNAMENT_UPDATED,
    {
      ...(data?.getTournaments
        ? {
            variables: {
              tournamentIds: data.getTournaments.map(
                (tournament) => tournament._id
              )
            }
          }
        : { skip: true })
    }
  );

  const tournaments = data?.getTournaments || [];

  const activeTournaments = tournaments.filter(
    (tournament) => tournament.status === TournamentStatus.Active
  );
  const scheduledTournaments = tournaments.filter(
    (tournament) => tournament.status === TournamentStatus.Created
  );
  const completedTournaments = tournaments.filter(
    (tournament) => tournament.status === TournamentStatus.Completed
  );

  return loading && !data ? (
    <Spinner />
  ) : (
    <Box>
      <JoinTournamentList
        label={'Active Tournaments'}
        tournaments={activeTournaments}
      />
      <JoinTournamentList
        label={'Scheduled Tournaments'}
        tournaments={scheduledTournaments}
        withCreateButton
      />
      <JoinTournamentList
        label={'Completed Tournaments'}
        tournaments={completedTournaments}
      />
    </Box>
  );
};

export default TournamentsPage;
