import React from 'react';
import { useQuery } from '@apollo/client';

import { Typography } from '@mui/material/';
import Spinner from 'components/Spinner';

import { GET_TOURNAMENTS } from 'graphql/queries/queries';
import { useStyles } from 'components/pages/app/TournamentPage/styles';
import { Tournament } from 'types/types';
import TournamentsTable from 'components/tables/TournamentTable';

interface PlayPageProps {
  isAdmin: boolean;
}

const PlayPage = ({ isAdmin }: PlayPageProps): JSX.Element => {
  const classes = useStyles();

  const { data: tournamentData, loading } = useQuery<{
    getTournaments: Tournament[];
  }>(GET_TOURNAMENTS);

  const tournaments = tournamentData?.getTournaments;

  // todo implement this for all users with isAdmin
  console.log(isAdmin);

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
        tournaments && <TournamentsTable tournaments={tournaments} />
      )}
    </div>
  );
};

export default PlayPage;
