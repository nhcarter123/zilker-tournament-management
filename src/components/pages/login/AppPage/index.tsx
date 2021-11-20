import React, { useState } from 'react';
import { Role, User } from 'types/types';
import { Route } from 'react-router-dom';

import { Page } from 'types/page';
import { useStyles } from 'components/pages/login/AppPage/styles';

import { Button } from 'antd';
import SideMenu from 'components/SideMenu';
import PlayPage from 'components/pages/app/PlayPage';
import TournamentPage from 'components/pages/app/TournamentPage';
import TournamentsPage from 'components/pages/app/TournamentsPage';
import RulesPage from 'components/pages/app/RulesPage';
import ProfilePage from 'components/pages/app/ProfilePage';
import SocialPage from 'components/pages/app/SocialPage';

interface AppPageProps {
  me: User;
}

const AppPage = ({ me }: AppPageProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const isAdmin = me.role === Role.Admin;

  return (
    <div className={classes.root}>
      <div className={classes.openMenu}>
        <Button type={'primary'} onClick={(): void => setOpen(true)}>
          Menu
        </Button>
      </div>
      <SideMenu open={open} setOpen={setOpen} />
      <Route
        path={Page.Play}
        render={(): JSX.Element => <PlayPage me={me} />}
      />
      <Route
        path={Page.Tournaments}
        render={(): JSX.Element => <TournamentsPage isAdmin={isAdmin} />}
      />
      <Route
        path={Page.EditTournament}
        render={(): JSX.Element => <TournamentPage isAdmin={isAdmin} />}
      />
      <Route
        path={Page.Profile}
        render={(): JSX.Element => <ProfilePage me={me} />}
      />
      <Route path={Page.Social} component={SocialPage} />
      <Route path={Page.Rules} component={RulesPage} />
    </div>
  );
};

export default AppPage;
