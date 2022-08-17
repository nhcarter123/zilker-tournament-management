import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { Box } from '@mui/material';
import JoinTournamentList from 'components/pages/AppPage/TournamentsPage/JoinTournamentList';
import Spinner from 'components/Spinner';

import { GET_TOURNAMENTS } from 'graphql/definitions/queries';
import { TOURNAMENT_UPDATED } from 'graphql/definitions/subscriptions';

import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';
import { useMutation, useSubscription } from '@apollo/client';
import { onError } from 'graphql/errorHandler';

import {
  TournamentUpdatedData,
  TournamentUpdatedVariables,
  TournamentWithOrganization
} from 'types/types';
import { Page } from 'types/page';
import { JOIN_TOURNAMENT } from 'graphql/definitions/mutations';

const TournamentsPage = (): JSX.Element => {
  const history = useHistory();
  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const [joinTournament, { loading: joinLoading }] = useMutation<{
    joinTournament?: { tournamentId: string };
  }>(JOIN_TOURNAMENT, {
    onError,
    onCompleted: (data) => {
      const tournamentId = data.joinTournament?.tournamentId;

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
    const tournamentId = queryParams.get('tournamentId');

    if (organizationId) {
      queryParams.delete('join');
      queryParams.delete('tournamentId');
      history.replace({
        search: queryParams.toString()
      });

      void joinTournament({
        variables: {
          organizationId,
          tournamentId
        }
      });
    }
  }, [queryParams, joinLoading, history, joinTournament]);

  const { data, loading } = useQueryWithReconnect<{
    getTournaments: TournamentWithOrganization[];
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

  const tournaments = [...(data?.getTournaments || [])].sort(
    (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
  );

  // const activeTournaments = tournaments.filter(
  //   (tournament) => tournament.status === TournamentStatus.Active
  // );
  // const scheduledTournaments = tournaments.filter(
  //   (tournament) => tournament.status === TournamentStatus.Created
  // );
  // const completedTournaments = tournaments.filter(
  //   (tournament) => tournament.status === TournamentStatus.Completed
  // );

  return joinLoading || (loading && !data) ? (
    <Spinner />
  ) : (
    <Box display={'flex'} justifyContent={'center'} height={'100%'}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px'
        }}
      >
        <JoinTournamentList tournaments={tournaments} />
      </Box>
    </Box>
  );
};

export default TournamentsPage;
