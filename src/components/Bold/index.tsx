import React, { ReactNode } from 'react';
import { Box } from '@mui/material/';

interface PlayPageProps {
  children: ReactNode;
}

const Bold = ({ children }: PlayPageProps): JSX.Element => {
  return <Box sx={{ fontWeight: 'bold' }}>{children}</Box>;
};

export default Bold;
