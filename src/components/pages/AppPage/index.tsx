import React, { useContext, useState } from 'react';

import SideMenu from 'components/SideMenu';
import MainHeader from 'components/MainHeader';
import MainContent from 'components/MainContent';

import { useStyles } from 'components/pages/AppPage/styles';
import { Box, Divider } from '@mui/material/';
import MyTournamentContextProvider from 'context/myTournamentContext';
import { UserContext } from 'context/userContext';
import { Redirect } from 'react-router';
import { Page } from 'types/page';
import { useLocation } from 'react-router-dom';

const AppPage = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const search = useLocation().search;
  const me = useContext(UserContext);
  const classes = useStyles();

  if (!me) {
    return <Redirect to={{ pathname: Page.Login, search }} />;
  }

  return (
    <div className={classes.root}>
      <SideMenu open={open} setOpen={setOpen} />
      <MainHeader setOpen={setOpen} />

      <Box pt={1}>
        <Divider />
      </Box>

      <MyTournamentContextProvider>
        <MainContent />
      </MyTournamentContextProvider>
    </div>
  );
};

export default AppPage;
