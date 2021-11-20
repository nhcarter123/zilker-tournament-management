import React from 'react';
import { useQuery } from '@apollo/client';

import { Typography } from '@mui/material/';
import Spinner from 'components/Spinner';

import { GET_TOURNAMENTS } from 'graphql/queries/queries';
import { useStyles } from 'components/pages/app/TournamentsPage/styles';
import { Tournament } from 'types/types';
import TournamentsTable from 'components/tables/TournamentTable';

interface PlayPageProps {
  isAdmin: boolean;
}

const TournamentsPage = ({ isAdmin }: PlayPageProps): JSX.Element => {
  const classes = useStyles();

  // todo replace is admin propagation with more hooks instead

  const { data: tournamentData, loading } = useQuery<{
    getTournaments: Tournament[];
  }>(GET_TOURNAMENTS);

  const tournaments = tournamentData?.getTournaments;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant={'h4'} align={'center'}>
          Tournaments
        </Typography>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        tournaments && (
          <TournamentsTable tournaments={tournaments} isAdmin={isAdmin} />
        )
      )}
    </div>
  );
};

export default TournamentsPage;
