import React from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';

import { Typography } from '@mui/material/';
import Spinner from 'components/Spinner';
import JoinTournamentButton from 'components/buttons/JoinTournamentButton';

import { GET_ACTIVE_TOURNAMENT } from 'graphql/queries/queries';
import { Tournament, User } from 'types/types';
import { useStyles } from 'components/pages/app/PlayPage/styles';

interface PlayPageProps {
  me: User;
}

const PlayPage = ({ me }: PlayPageProps): JSX.Element => {
  const classes = useStyles();

  const { data: tournamentData, loading } = useQuery<{
    getActiveTournament: Nullable<Tournament>;
  }>(GET_ACTIVE_TOURNAMENT);

  const tournament = tournamentData?.getActiveTournament;
  const isTournamentAvailable = me._id && !tournament?.players.includes(me._id);

  return (
    <div className={classes.root}>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {isTournamentAvailable && tournament ? (
            <>
              <Typography variant={'h4'} align={'center'}>
                {tournament.name}
              </Typography>
              <Typography variant={'subtitle2'} align={'center'}>
                {moment(tournament.date).format('LL')}
              </Typography>
              <JoinTournamentButton
                tournamentId={tournament._id}
                userId={me._id}
              />
            </>
          ) : (
            <>
              <Typography variant={'h4'} align={'center'}>
                Uh oh
              </Typography>
              <div>
                It looks like there aren’t any active tournaments right now...
                😢
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayPage;
