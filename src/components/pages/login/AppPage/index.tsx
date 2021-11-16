import React, { useState } from 'react';
import { Role, User } from 'types/types';
import { Redirect, Route } from 'react-router-dom';

import { Pages } from 'types/pages';
import { useStyles } from 'components/pages/login/AppPage/styles';

import SideMenu from 'components/SideMenu';
import PlayPage from 'components/pages/app/PlayPage';
import TournamentPage from 'components/pages/app/TournamentPage';
import TournamentsPage from 'components/pages/app/TournamentsPage';
import RulesPage from 'components/pages/app/RulesPage';
import { Button } from 'antd';

interface AppPageProps {
  me: User;
}

const AppPage = ({ me }: AppPageProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const isAdmin = me.role === Role.admin;

  return (
    <div className={classes.root}>
      <div className={classes.openMenu}>
        <Button type={'primary'} onClick={(): void => setOpen(true)}>
          Menu
        </Button>
      </div>
      <SideMenu open={open} setOpen={setOpen} isAdmin={isAdmin} />
      <Redirect from={Pages.app} exact to={Pages.play} />
      <Route
        path={Pages.play}
        render={(): JSX.Element => <PlayPage me={me} />}
      />
      <Route path={Pages.profile} />
      <Route path={Pages.players} />
      <Route
        path={Pages.tournaments}
        render={(): JSX.Element => <TournamentsPage isAdmin={isAdmin} />}
      />
      <Route
        path={Pages.editTournament}
        render={(): JSX.Element => <TournamentPage isAdmin={isAdmin} />}
      />
      <Route path={Pages.rules} component={RulesPage} />
    </div>
  );
};

export default AppPage;
