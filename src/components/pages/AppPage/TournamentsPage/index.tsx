import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { Box } from '@mui/material/';
import JoinTournamentList from './JoinTournamentList';
import Spinner from 'components/Spinner';

import { GET_MY_TOURNAMENT, GET_TOURNAMENTS } from 'graphql/queries/queries';

import { Page } from 'types/page';
import { Tournament, TournamentStatus } from 'types/types';

const TournamentsPage = (): JSX.Element => {
  const history = useHistory();

  // // todo maybe move this
  const { data, loading } = useQuery<{
    getMyTournament: Nullable<Tournament>;
  }>(GET_MY_TOURNAMENT, {
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (data?.getMyTournament) {
      history.push(
        Page.Tournament.replace(':tournamentId', data.getMyTournament._id)
      );
    }
  }, [data, history]);

  const { data: tournamentsData, loading: tournamentsLoading } = useQuery<{
    getTournaments: Tournament[];
  }>(GET_TOURNAMENTS, {
    fetchPolicy: 'cache-and-network'
  });

  const startOfDay = moment().startOf('day');

  const tournaments = tournamentsData?.getTournaments || [];

  const futureTournaments = tournaments.filter(
    (tournament) => startOfDay.diff(moment(tournament.date)) <= 0
  );
  const pastTournaments = tournaments.filter(
    (tournament) => startOfDay.diff(moment(tournament.date)) > 0
  );

  const activeTournaments = futureTournaments.filter(
    (tournament) => tournament.status === TournamentStatus.Active
  );
  const scheduledTournaments = futureTournaments.filter(
    (tournament) => tournament.status === TournamentStatus.Created
  );

  return (loading && !data) || (tournamentsLoading && !tournamentsData) ? (
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
        label={'Past Tournaments'}
        tournaments={pastTournaments}
      />
    </Box>
  );
};

export default TournamentsPage;
