import React from 'react';
import { Typography } from '@mui/material/';
import { useStyles } from 'components/pages/app/PlayPage/TournamentPage/WaitingPage/styles';

const WaitingPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant={'h4'} align={'center'}>
          Getting things ready
        </Typography>

        <Typography variant={'body1'}>
          The first round will begin soon... 🕒
        </Typography>

        <Typography variant={'body1'}>
          In the mean time, play a game wth a friend!
        </Typography>

        <Typography variant={'body1'}>Or a stranger 👀</Typography>
      </div>
    </div>
  );
};

export default WaitingPage;
