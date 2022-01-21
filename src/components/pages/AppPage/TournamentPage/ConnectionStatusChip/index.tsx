import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material/';
import Bold from 'components/Bold';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface ConnectionStatusProps {
  isOnline: boolean;
}

const ConnectionStatus = ({ isOnline }: ConnectionStatusProps): JSX.Element => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      px={0.5}
    >
      {isOnline ? (
        <>
          <Typography component={'span'}>
            <Bold>Connected</Bold>
          </Typography>
          <CheckCircleOutlineIcon
            sx={{ marginLeft: '4px', width: '18px', height: '18px' }}
          />
        </>
      ) : (
        <>
          <Typography component={'span'}>
            <Bold>Reconnecting...</Bold>
          </Typography>
          <CircularProgress
            size={16}
            sx={{ color: 'white', marginLeft: '4px' }}
            thickness={6}
          />
        </>
      )}
    </Box>
  );
};

export default ConnectionStatus;
