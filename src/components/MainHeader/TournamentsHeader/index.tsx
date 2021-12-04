import React from 'react';
import { Typography } from '@mui/material';

const TournamentsHeader = (): JSX.Element => {
  return (
    <Typography variant={'h4'} sx={{ lineHeight: 1.5 }}>
      Tournaments
    </Typography>
  );
};

export default TournamentsHeader;
