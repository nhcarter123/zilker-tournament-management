import React from 'react';
import { Route } from 'react-router-dom';

import { Box } from '@mui/material';

import { Page } from 'types/page';
import SimpleHeader from 'components/MainHeader/SimpleHeader';

const MainHeader = (): JSX.Element => {
  return (
    <Box display={'flex'} alignItems={'center'} pl={2}>
      <Route path={Page.Home} render={() => <SimpleHeader title={'Home'} />} />
      <Route
        path={Page.Profile}
        render={() => <SimpleHeader title={'Profile'} />}
      />
      <Route
        path={Page.Stats}
        render={() => <SimpleHeader title={'Stats'} />}
      />
    </Box>
  );
};

export default MainHeader;
