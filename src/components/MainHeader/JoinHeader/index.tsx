import React from 'react';
import { Typography } from '@mui/material';

const JoinHeader = (): JSX.Element => {
  // todo have all these headers use a shared component
  return (
    <Typography variant={'h4'} sx={{ lineHeight: 1.5 }}>
      Join
    </Typography>
  );
};

export default JoinHeader;
