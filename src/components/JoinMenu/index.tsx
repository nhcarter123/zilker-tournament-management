import React from 'react';
import { Box, Typography } from '@mui/material/';
import QRCode from 'react-qr-code';
import Spinner from 'components/Spinner';

const JoinMenu = (): JSX.Element => {
  const gameCode = 'A6YDH3';
  const gameCodeLoading = false;

  return (
    <Box display={'flex'} justifyContent={'center'}>
      {gameCodeLoading ? (
        <Spinner />
      ) : (
        <Box
          px={2}
          py={1}
          sx={{
            borderRadius: '8px',
            border: '3px solid',
            borderColor: '#4f4f4f'
          }}
        >
          <Box display={'flex'} alignItems={'center'}>
            <Typography mr={1} variant={'body1'}>
              Game code:
            </Typography>
            <Typography variant={'h5'}>{gameCode}</Typography>
          </Box>

          <QRCode
            value={gameCode}
            size={64}
            style={{ height: 'auto', width: '100%' }}
            viewBox={`0 0 64 64`}
          />
        </Box>
      )}
    </Box>
  );
};

export default JoinMenu;
