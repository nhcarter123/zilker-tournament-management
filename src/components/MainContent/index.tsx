import React from 'react';
import { Route } from 'react-router-dom';

import { Page } from 'types/page';

import PlayPage from 'components/pages/AppPage/PlayPage';
import TournamentPage from 'components/pages/AppPage/TournamentPage';
import TournamentsPage from 'components/pages/AppPage/TournamentsPage';
import RulesPage from 'components/pages/AppPage/RulesPage';
import ProfilePage from 'components/pages/AppPage/ProfilePage';
import SocialPage from 'components/pages/AppPage/SocialPage';
import MatchPage from 'components/pages/AppPage/PlayPage/MatchPage';

const MainContent = (): JSX.Element => {
  return (
    <>
      <Route path={Page.Play} component={PlayPage} />
      <Route path={Page.Tournaments} component={TournamentsPage} />
      <Route path={Page.EditTournament} component={TournamentPage} />
      <Route path={Page.EditMatch} component={MatchPage} />
      <Route path={Page.Profile} component={ProfilePage} />
      <Route path={Page.Social} component={SocialPage} />
      <Route path={Page.Rules} component={RulesPage} />
    </>
  );
};

export default MainContent;
