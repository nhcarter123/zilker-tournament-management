import React from 'react';
import moment from 'moment';

import { Typography } from '@mui/material/';
import JoinTournamentButton from 'components/buttons/JoinTournamentButton';

import { useStyles } from 'components/pages/app/PlayPage/styles';
import { Tournament, User } from 'types/types';

interface PlayPageProps {
  me: User;
  tournament: Nullable<Tournament>;
}

const JoinPage = ({ me, tournament }: PlayPageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        {tournament ? (
          <>
            <Typography variant={'h4'} align={'center'}>
              {tournament.name}
            </Typography>
            <Typography variant={'subtitle2'} align={'center'}>
              {moment(tournament.date).format('LL')}
            </Typography>
            <Typography variant={'subtitle2'} align={'center'}>
              {`${tournament.players.length} player${
                tournament.players.length !== 1 ? 's' : ''
              } have joined so far`}
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

export default JoinPage;
