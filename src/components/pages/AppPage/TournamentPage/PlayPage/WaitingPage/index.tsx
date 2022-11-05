import React from 'react';
import { Box, Typography } from '@mui/material/';
import { useStyles } from 'components/pages/AppPage/TournamentPage/PlayPage/WaitingPage/styles';

interface WaitingPageProps {
  tournamentStarted: boolean;
}

const WaitingPage = ({ tournamentStarted }: WaitingPageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.root} px={2}>
      <div>
        {tournamentStarted ? (
          <>
            <Typography mb={2} variant={'h4'} align={'center'}>
              Please stand by
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
            <Typography mb={2} variant={'h4'} align={'center'}>
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
    </Box>
  );
};

export default WaitingPage;
