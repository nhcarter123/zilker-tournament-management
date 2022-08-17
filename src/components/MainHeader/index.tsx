import React, { Dispatch, SetStateAction } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { IconButton, Box } from '@mui/material';

import { Page } from 'types/page';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SimpleHeader from 'components/MainHeader/SimpleHeader';

interface MainHeaderProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MainHeader = ({ setOpen }: MainHeaderProps): JSX.Element => {
  const history = useHistory();
  const page = useLocation().pathname;

  const hasBackButton = page.includes('/view');

  return (
    <Box display={'flex'} alignItems={'center'} pl={1}>
      <Box>
        <IconButton
          aria-label={'menu'}
          size={'large'}
          onClick={() => (hasBackButton ? history.goBack() : setOpen(true))}
        >
          {hasBackButton ? <ArrowBackIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Route
        path={Page.Tournaments}
        render={() => <SimpleHeader title={'Tournaments'} />}
      />
      <Route
        path={Page.Profile}
        render={() => <SimpleHeader title={'Profile'} />}
      />
      <Route
        path={Page.Community}
        render={() => <SimpleHeader title={'Community'} />}
      />
      <Route
        path={Page.Rules}
        render={() => <SimpleHeader title={'Rules'} />}
      />
      <Route
        path={Page.Donate}
        render={() => <SimpleHeader title={'Donate'} />}
      />
      <Route
        path={Page.About}
        render={() => <SimpleHeader title={'About'} />}
      />
      <Route
        path={Page.Stats}
        render={() => <SimpleHeader title={'Stats'} />}
      />
    </Box>
  );
};

export default MainHeader;
