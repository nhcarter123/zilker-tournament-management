import React, { useState } from 'react';

import SideMenu from 'components/SideMenu';
import MainHeader from 'components/MainHeader';
import MainContent from 'components/MainContent';

import { useStyles } from 'components/pages/AppPage/styles';
import { Box, Divider } from '@mui/material/';
import MyTournamentContextProvider from 'context/myTournamentContext';

const AppPage = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MyTournamentContextProvider>
        <SideMenu open={open} setOpen={setOpen} />
        <MainHeader setOpen={setOpen} />

        <Box pt={1}>
          <Divider />
        </Box>

        <MainContent />
      </MyTournamentContextProvider>
    </div>
  );
};

export default AppPage;
