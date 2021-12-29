import React from 'react';
import { Typography } from '@mui/material/';
import { useStyles } from 'components/pages/AppPage/TournamentPage/WaitingPage/styles';

interface WaitingPageProps {
  tournamentStarted: boolean;
}

const WaitingPage = ({ tournamentStarted }: WaitingPageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        {tournamentStarted ? (
          <>
            <Typography variant={'h4'} align={'center'}>
              Please stand by... 🕒
            </Typography>

            <Typography variant={'body1'}>
              You will be joining the next round!!
            </Typography>

            <Typography variant={'body1'}>
              In the mean time, grab a drink and enjoy the games 🍸
            </Typography>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default WaitingPage;
