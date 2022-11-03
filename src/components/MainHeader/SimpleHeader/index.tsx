import React from 'react';
import { Box, Typography } from '@mui/material';

interface SimpleHeaderProps {
  title: string;
}

const SimpleHeader = ({ title }: SimpleHeaderProps): JSX.Element => {
  return (
    <Box pt={1} bgcolor={'#ff843b'}>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant={'h5'} color={'#fff'}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default SimpleHeader;
