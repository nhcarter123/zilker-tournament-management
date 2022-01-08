import React, { useContext } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material/';
import { WebsocketContext } from 'context/websocketContext';

const ConnectionStatus = (): JSX.Element => {
  const { isOnline } = useContext(WebsocketContext);

  const lightBody = isOnline ? '#26FF00' : '#ff2323';
  const highlight = isOnline ? '#b3ffa6' : '#ff8c8c';

  return (
    <Box display={'flex'} alignItems={'center'}>
      {isOnline ? (
        <Typography>Connected</Typography>
      ) : (
        <Typography>Reconnecting...</Typography>
      )}
      <Box sx={{ width: '26px' }}>
        <Box
          sx={{
            position: 'relative',
            marginLeft: '8px',
            background: lightBody,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            boxShadow: `0 0 5px ${lightBody}`,
            border: '1px solid',
            borderColor: '#7a7a7a'
          }}
        >
          {!isOnline && (
            <Box
              sx={{
                position: 'absolute',
                top: '-6px',
                left: '-6px'
              }}
            >
              <CircularProgress size={20} color={'error'} thickness={1} />
            </Box>
          )}
          <Box
            sx={{
              position: 'absolute',
              background: `${highlight}`,
              width: '4px',
              height: '4px',
              top: '2px',
              left: '2px',
              borderRadius: '50%'
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ConnectionStatus;
