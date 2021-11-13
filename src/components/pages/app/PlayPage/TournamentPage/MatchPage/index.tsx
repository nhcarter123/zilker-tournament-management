import React from 'react';
import moment from 'moment';

import { Typography } from '@mui/material/';
import JoinTournamentButton from 'components/buttons/JoinTournamentButton';

import { Tournament, User } from 'types/types';
import { useStyles } from 'components/pages/app/PlayPage/styles';

interface PlayPageProps {
  me: User;
  tournament: Tournament;
}

const MatchPage = ({ me, tournament }: PlayPageProps): JSX.Element => {
  const classes = useStyles();

  const isTournamentAvailable = me._id && !tournament?.players.includes(me._id);

  return (
    <div className={classes.root}>
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
              It looks like there aren’t any active tournaments right now... 😢
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MatchPage;
