import React from 'react';
import { Box, Typography } from '@mui/material/';
import Hand from 'svg/phone_hand.jpg';

const AboutPage = (): JSX.Element => {
  return (
    <Box m={2} display={'flex'} justifyContent={'center'}>
      <Box sx={{ maxWidth: '400px' }}>
        <Typography mt={1} variant={'body1'}>
          Zilker Chess is the easiest and fastest way to host a rapid or blitz
          tournament in person. ⚡
        </Typography>
        <img style={{ width: '100%' }} src={Hand} alt={'phone-hand'} />
        <Typography mt={1} variant={'body1'}>
          Players can join, view matches, and enter results all in real time.
        </Typography>

        <Typography mt={3} variant={'body1'}>
          To get started, join an active tournament on the tournaments page,
          create your own organization from your profile page to host your own
          tournament!
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutPage;
