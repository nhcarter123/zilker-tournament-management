import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import { Box } from '@mui/material';

import SimpleHeader from 'components/MainHeader/SimpleHeader';
import TournamentHeader from 'components/MainHeader/TournamentHeader';

import { Page } from 'types/page';
import { MyTournamentContext } from 'context/myTournamentContext';

const MainHeader = (): JSX.Element => {
  const { currentTournament } = useContext(MyTournamentContext);

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box width={'100%'}>
        <Route
          path={Page.Home}
          render={() => <SimpleHeader title={'Home'} />}
          exact
        />
        <Route
          path={Page.Profile}
          render={() => <SimpleHeader title={'Profile'} />}
        />
        <Route
          path={Page.Stats}
          render={() => <SimpleHeader title={'Stats'} />}
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
