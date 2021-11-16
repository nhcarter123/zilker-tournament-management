import React from 'react';
import { Route } from 'react-router-dom';

import TournamentHeader from 'components/TournamentHeader';
import MatchPage from 'components/pages/app/PlayPage/TournamentPage/MatchPage';
import WaitingPage from 'components/pages/app/PlayPage/TournamentPage/WaitingPage';

import { Tournament, User } from 'types/types';
import { Pages } from 'types/pages';
import { useStyles } from 'components/pages/app/PlayPage/TournamentPage/styles';

interface PlayPageProps {
  me: User;
  tournament: Tournament;
}

const TournamentPage = ({ me, tournament }: PlayPageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TournamentHeader tournament={tournament} />

      <Route
        path={Pages.waiting}
        render={(): JSX.Element => <WaitingPage tournament={tournament} />}
      />
      <Route
        path={Pages.match}
        render={(): JSX.Element => <MatchPage me={me} />}
      />
    </div>
  );
};

export default TournamentPage;
