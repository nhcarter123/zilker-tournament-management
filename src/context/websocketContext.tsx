import React, { createContext, useEffect, useState } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';

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

const WebsocketContextProvider = ({
  wsClient,
  children
}: WebsocketContextProviderProps): JSX.Element => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    wsClient.onConnected(() => {
      setIsOnline(true);
      console.log('websocket connected!!');
    });
    wsClient.onDisconnected(() => {
      setIsOnline(false);
      console.log('websocket disconnected!!');
    });
    wsClient.onReconnected(() => {
      setIsOnline(true);
      console.log('websocket reconnected!!');
    });
  }, [wsClient]);

  return (
    <WebsocketContext.Provider
      value={{
        isOnline
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketContextProvider;
