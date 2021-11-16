import React from 'react';
import { Typography } from '@mui/material/';

import { Tournament } from 'types/types';
import { useStyles } from 'components/pages/app/PlayPage/TournamentPage/WaitingPage/styles';

interface PlayPageProps {
  tournament: Tournament;
}

const WaitingPage = ({ tournament }: PlayPageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant={'h4'} align={'center'}>
          Getting things ready
        </Typography>

        {tournament.rounds.length ? (
          <Typography variant={'body1'} align={'center'}>
            The next round will begin soon... 🕒
          </Typography>
        ) : (
          <div>
            <Typography variant={'body1'}>
              The first round will begin soon... 🕒
            </Typography>
            <Typography variant={'body1'}>
              In the mean time, play a game wth a friend!
            </Typography>
            <Typography variant={'body1'}>Or a stranger 👀</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitingPage;
