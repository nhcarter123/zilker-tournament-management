import React from 'react';
import { Route } from 'react-router-dom';

import MatchPage from 'components/pages/AppPage/PlayPage/TournamentPage/MatchPage';
import WaitingPage from 'components/pages/AppPage/PlayPage/TournamentPage/WaitingPage';

import { Page } from 'types/page';

const TournamentPage = (): JSX.Element => {
  return (
    <>
      <Route path={Page.Waiting} component={WaitingPage} />
      <Route path={Page.Match} component={MatchPage} />
    </>
  );
};

export default TournamentPage;
