import React from 'react';
import { Box, Typography } from '@mui/material/';
import Hand from 'image/phone_hand.jpg';

const AboutPage = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
        maxWidth: '400px'
      }}
      mx={1}
    >
      <Box
        sx={{
          overflow: 'auto',
          borderColor: '#e5e5e5',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <Box mt={2}>
          <Typography mt={1} variant={'body1'}>
            Zilker Chess is the easiest and fastest way to host an
            over-the-board tournament. ⚡
          </Typography>
          <img style={{ width: '100%' }} src={Hand} alt={'phone-hand'} />
          <Typography mt={1} variant={'body1'}>
            Players can join, view matches, and enter results all in real time.
          </Typography>

          <Typography mt={3} mb={6} variant={'body1'}>
            To get started, join an active tournament on the events page or
            challenge a stranger! If you&apos;d like to host a tournament of
            your own, start by creating an organization from your profile page.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;
