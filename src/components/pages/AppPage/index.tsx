import React from 'react';

import MainHeader from 'components/MainHeader';
import MainContent from 'components/MainContent';

import { useStyles } from 'components/pages/AppPage/styles';
import { Box, Divider } from '@mui/material/';
import MyTournamentContextProvider from 'context/myTournamentContext';
import MainFooter  from 'components/MainFooter';

const AppPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MyTournamentContextProvider>
        <MainHeader />

        <Box pt={1}>
          <Divider />
        </Box>

        <MainContent />

        <MainFooter />
      </MyTournamentContextProvider>
    </div>
  );
};

export default AppPage;
