import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import { Box } from '@mui/material';

import SimpleHeader from 'components/MainHeader/SimpleHeader';
import TournamentHeader from 'components/MainHeader/TournamentHeader';

import { Page } from 'types/page';
import { MyTournamentContext } from 'context/myTournamentContext';
import { getPageName } from 'helpers/helpers';

const MainHeader = (): JSX.Element => {
  const { currentTournament } = useContext(MyTournamentContext);

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box width={'100%'}>
        <Route
          path={Page.Home}
          render={() => <SimpleHeader title={getPageName(Page.Home)} />}
          exact
        />
        <Route
          path={Page.Challenge}
          render={() => <SimpleHeader title={getPageName(Page.Challenge)} />}
          exact
        />
        <Route
          path={Page.Tournaments}
          render={() => <SimpleHeader title={getPageName(Page.Tournaments)} />}
          exact
        />
        <Route
          path={Page.Profile}
          render={() => <SimpleHeader title={getPageName(Page.Profile)} />}
        />
        <Route
          path={Page.Stats}
          render={() => (
            <SimpleHeader title={getPageName(Page.Stats)} back={Page.Home} />
          )}
        />
        <Route
          path={Page.About}
          render={() => (
            <SimpleHeader title={getPageName(Page.About)} back={Page.Home} />
          )}
        />
        <Route
          path={Page.Donate}
          render={() => (
            <SimpleHeader title={getPageName(Page.Donate)} back={Page.Home} />
          )}
        />
        <Route
          path={Page.History}
          render={() => (
            <SimpleHeader title={getPageName(Page.History)} back={Page.Home} />
          )}
        />
        <Route
          path={Page.Community}
          render={() => (
            <SimpleHeader
              title={getPageName(Page.Community)}
              back={Page.Home}
            />
          )}
        />
        <Route
          path={Page.Tournament}
          render={() => <TournamentHeader tournament={currentTournament} />}
        />
      </Box>
    </Box>
  );
};

export default MainHeader;
