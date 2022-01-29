import React, { createContext, useEffect, useState } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Fade, Slide, SlideProps, Snackbar } from '@mui/material';
import ConnectionStatus from 'components/pages/AppPage/TournamentPage/ConnectionStatusChip';
import { Box } from '@mui/material/';

export const WebsocketContext = createContext<IWebsocketContext>({
  isOnline: true
});

interface IWebsocketContext {
  isOnline: boolean;
}

interface WebsocketContextProviderProps {
  wsClient: SubscriptionClient;
  children: React.ReactNode;
}

const SlideTransition = (props: SlideProps) => {
  return (
    <Slide {...props} direction="up" timeout={1000}>
      <div>
        <Fade {...props} timeout={1000}>
          {props.children}
        </Fade>
      </div>
    </Slide>
  );
};

const WebsocketContextProvider = ({
  wsClient,
  children
}: WebsocketContextProviderProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    wsClient.onConnected(() => {
      setIsOnline(true);
      setTimeout(() => setOpen(false), 1000);
    });
    wsClient.onDisconnected(() => {
      setIsOnline(false);
      setOpen(true);
    });
    wsClient.onReconnected(() => {
      setIsOnline(true);
      setTimeout(() => setOpen(false), 1000);
    });
  }, [wsClient]);

  return (
    <WebsocketContext.Provider
      value={{
        isOnline
      }}
    >
      <Snackbar
        open={open}
        TransitionComponent={SlideTransition}
        sx={{ bottom: '0 !important' }}
      >
        <Box
          sx={{
            width: '165px',
            background: isOnline ? '#40a500' : '#9f0000',
            color: '#fff',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px'
          }}
          px={1}
          py={0.5}
          mx={'auto'}
        >
          <ConnectionStatus isOnline={isOnline} />
        </Box>
      </Snackbar>
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketContextProvider;
