import React from 'react';
import { Route } from 'react-router-dom';

import { Page } from 'types/page';

import UpcomingPage from '../pages/AppPage/UpcomingPage';
import TournamentPage from 'components/pages/AppPage/TournamentPage';
import TournamentsPage from 'components/pages/AppPage/TournamentsPage';
import ViewTournamentPage from 'components/pages/AppPage/ViewTournamentPage';
import EditMatchPage from 'components/pages/AppPage/EditMatchPage';
import RulesPage from 'components/pages/AppPage/RulesPage';
import ProfilePage from 'components/pages/AppPage/ProfilePage';
import SocialPage from 'components/pages/AppPage/SocialPage';
import DonatePage from 'components/pages/AppPage/DonatePage';

const MainContent = (): JSX.Element => {
  return (
    <>
      <Route path={Page.Upcoming} component={UpcomingPage} />
      <Route path={Page.Tournaments} component={TournamentsPage} />
      <Route path={Page.Tournament} component={TournamentPage} />
      <Route path={Page.ViewTournament} component={ViewTournamentPage} />
      <Route path={Page.EditMatch} component={EditMatchPage} />
      <Route path={Page.Profile} component={ProfilePage} />
      <Route path={Page.Social} component={SocialPage} />
      <Route path={Page.Rules} component={RulesPage} />
      <Route path={Page.Donate} component={DonatePage} />
    </>
  );
};

export default MainContent;
