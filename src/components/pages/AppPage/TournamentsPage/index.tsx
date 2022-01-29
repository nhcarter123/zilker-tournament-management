import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { Box } from '@mui/material';
import JoinTournamentList from 'components/pages/AppPage/TournamentsPage/JoinTournamentList';
import Spinner from 'components/Spinner';

import { GET_TOURNAMENTS } from 'graphql/queries/queries';
import { TOURNAMENT_UPDATED } from 'graphql/subscriptions/subscriptions';
import { AUTO_JOIN_TOURNAMENT } from 'graphql/mutations/mutations';

import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';
import { useMutation, useSubscription } from '@apollo/client';
import { onError } from 'graphql/errorHandler';

import {
  Tournament,
  TournamentStatus,
  TournamentUpdatedData,
  TournamentUpdatedVariables
} from 'types/types';
import { Page } from 'types/page';

const TournamentsPage = (): JSX.Element => {
  const history = useHistory();
  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const [autoJoinTournament, { loading: autoJoinLoading }] = useMutation<{
    autoJoinTournament?: { tournamentId: string };
  }>(AUTO_JOIN_TOURNAMENT, {
    onError,
    onCompleted: (data) => {
      const tournamentId = data.autoJoinTournament?.tournamentId;

      if (tournamentId) {
        history.push(
          Page.Tournament.replace(':tournamentId', tournamentId) +
            history.location.search
        );
      }
    }
  });

  useEffect(() => {
    const organizationId = queryParams.get('join');

    if (organizationId) {
      queryParams.delete('join');
      history.replace({
        search: queryParams.toString()
      });

      void autoJoinTournament({
        variables: {
          organizationId
        }
      });
    }
  }, [queryParams, autoJoinTournament, history]);

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

  return autoJoinLoading || (loading && !data) ? (
    <Spinner />
  ) : (
    <Box display={'flex'} justifyContent={'center'}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px'
        }}
      >
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
    </Box>
  );
};

export default TournamentsPage;
