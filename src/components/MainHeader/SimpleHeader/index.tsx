import React from 'react';
import { Typography } from '@mui/material';

interface SimpleHeaderProps {
  title: string;
}

const SimpleHeader = ({ title }: SimpleHeaderProps): JSX.Element => {
  return (
    <Typography variant={'h4'} sx={{ lineHeight: 1.5 }} ml={0.5}>
      {title}
    </Typography>
  );
};

export default SimpleHeader;
