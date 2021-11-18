import React from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Spinner from 'components/Spinner';

import { GET_ACTIVE_TOURNAMENT } from 'graphql/queries/queries';
import { Tournament, User } from 'types/types';
import { useStyles } from 'components/pages/app/PlayPage/styles';
import JoinPage from 'components/pages/app/PlayPage/JoinPage';
import TournamentPage from 'components/pages/app/PlayPage/TournamentPage';

import { Page } from 'types/page';

interface PlayPageProps {
  me: User;
}

enum TournamentStage {
  Waiting = 'waiting',
  Playing = 'playing'
}

// todo move to helper
const getCurrentStage = (tournament: Tournament): TournamentStage => {
  if (tournament.rounds.length) {
    return TournamentStage.Playing;
  }

  return TournamentStage.Waiting;
};

const PlayPage = ({ me }: PlayPageProps): JSX.Element => {
  const page = useLocation().pathname;
  const classes = useStyles();

  const { data: tournamentData, loading } = useQuery<{
    getActiveTournament: Nullable<Tournament>;
  }>(GET_ACTIVE_TOURNAMENT, {
    // pollInterval: 4000
  });

  const tournament = tournamentData?.getActiveTournament || null;

  const inTournament = tournament?.players.includes(me._id);

  if (!inTournament && page !== Page.Join) {
    return <Redirect to={Page.Join} />;
  }

  if (tournament && inTournament) {
    // todo rename Pages to Page
    const stage = getCurrentStage(tournament);
    let target: Page;

    switch (stage) {
      case TournamentStage.Playing:
        target = Page.Match;
        break;
      case TournamentStage.Waiting:
      default:
        target = Page.Waiting;
        break;
    }

    if (target && page !== target) {
      return <Redirect to={target} />;
    }
  }

  return (
    <div className={classes.root}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Route
            path={Page.Join}
            render={(): JSX.Element => (
              <JoinPage me={me} tournament={tournament} />
            )}
          />
          <Route
            path={Page.Tournament}
            render={(): JSX.Element =>
              tournament ? (
                <TournamentPage me={me} tournament={tournament} />
              ) : (
                <></>
              )
            }
          />
        </>
      )}
    </div>
  );
};

export default PlayPage;
