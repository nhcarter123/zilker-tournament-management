import React from 'react';
import { Typography } from '@mui/material';

const PlayHeader = (): JSX.Element => {
  return (
    <Typography variant={'h4'} sx={{ lineHeight: 1.5 }} ml={0.5}>
      Play
    </Typography>
  );
};

export default PlayHeader;
