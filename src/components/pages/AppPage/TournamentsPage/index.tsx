import React from 'react';
import { useQuery } from '@apollo/client';

import Spinner from 'components/Spinner';
import TournamentsTable from 'components/tables/TournamentTable';

import { GET_TOURNAMENTS } from 'graphql/queries/queries';
import { Tournament } from 'types/types';
import { Box } from '@mui/material/';

const TournamentsPage = (): JSX.Element => {
  const { data: tournamentData, loading } = useQuery<{
    getTournaments: Tournament[];
  }>(GET_TOURNAMENTS);

  const tournaments = tournamentData?.getTournaments;

  return (
    <Box sx={{ height: '100%' }}>
      {loading ? (
        <Spinner />
      ) : (
        tournaments && <TournamentsTable tournaments={tournaments} />
      )}
    </Box>
  );
};

export default TournamentsPage;
