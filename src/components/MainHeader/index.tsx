import React, { Dispatch, SetStateAction } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { IconButton, Box } from '@mui/material';
import TournamentHeader from 'components/MainHeader/TournamentHeader';

import { Page } from 'types/page';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SimpleHeader from './SimpleHeader';

interface MainHeaderProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MainHeader = ({ setOpen }: MainHeaderProps): JSX.Element => {
  const history = useHistory();
  const page = useLocation().pathname;

  const isBack = page.includes('/edit') || page.includes('/details');

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box>
        <IconButton
          aria-label={'menu'}
          size={'large'}
          onClick={() => (isBack ? history.goBack() : setOpen(true))}
        >
          {isBack ? <ArrowBackIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Route path={Page.Waiting} component={TournamentHeader} exact />
      <Route path={Page.Details} component={TournamentHeader} exact />
      <Route path={Page.Match} component={TournamentHeader} />
      <Route
        path={Page.Upcoming}
        render={() => <SimpleHeader title={'Upcoming'} />}
        exact
      />
      <Route
        path={Page.Join}
        render={() => <SimpleHeader title={'Join'} />}
        exact
      />
      <Route
        path={Page.Tournaments}
        render={() => <SimpleHeader title={'Tournaments'} />}
      />
      <Route
        path={Page.Profile}
        render={() => <SimpleHeader title={'Profile'} />}
      />
      <Route
        path={Page.Social}
        render={() => <SimpleHeader title={'Social'} />}
      />
      <Route
        path={Page.Rules}
        render={() => <SimpleHeader title={'Rules'} />}
      />
      <Route
        path={Page.Donate}
        render={() => <SimpleHeader title={'Donate'} />}
      />
    </Box>
  );
};

export default MainHeader;
