import React from 'react';

import MainHeader from 'components/MainHeader';
import MainContent from 'components/MainContent';

import { Box } from '@mui/material/';
import MyTournamentContextProvider from 'context/myTournamentContext';
import MainFooter from 'components/MainFooter';

const AppPage = (): JSX.Element => {
  return (
    <MyTournamentContextProvider>
      <Box
        display={'grid'}
        gridTemplateRows={'auto 1fr auto'}
        height={'100%'}
        width={'100%'}
      >
        <MainHeader />
        <MainContent />
        <MainFooter />
      </Box>
    </MyTournamentContextProvider>
  );
};

export default AppPage;
