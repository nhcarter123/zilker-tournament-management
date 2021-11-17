import React from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Spinner from 'components/Spinner';

import { GET_ACTIVE_TOURNAMENT } from 'graphql/queries/queries';
import { Tournament, User } from 'types/types';
import { useStyles } from 'components/pages/app/PlayPage/styles';
import JoinPage from 'components/pages/app/PlayPage/JoinPage';
import TournamentPage from 'components/pages/app/PlayPage/TournamentPage';

import { Pages } from 'types/pages';

interface PlayPageProps {
  me: User;
}

enum TournamentStage {
  waiting = 'waiting',
  playing = 'playing'
}

// todo move to helper
const getCurrentStage = (tournament: Tournament): TournamentStage => {
  if (tournament.rounds.length) {
    return TournamentStage.playing;
  }

  return TournamentStage.waiting;
};

const PlayPage = ({ me }: PlayPageProps): JSX.Element => {
  const page = useLocation().pathname;
  const classes = useStyles();

  const { data: tournamentData, loading } = useQuery<{
    getActiveTournament: Nullable<Tournament>;
  }>(GET_ACTIVE_TOURNAMENT, { pollInterval: 4000 });

  const tournament = tournamentData?.getActiveTournament || null;

  const inTournament = tournament?.players.includes(me._id);

  if (!inTournament && page !== Pages.join) {
    return <Redirect to={Pages.join} />;
  }

  if (tournament && inTournament) {
    // todo rename Pages to Page
    const stage = getCurrentStage(tournament);
    let target: Pages;

    switch (stage) {
      case TournamentStage.playing:
        target = Pages.match;
        break;
      case TournamentStage.waiting:
      default:
        target = Pages.waiting;
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
            path={Pages.join}
            render={(): JSX.Element => (
              <JoinPage me={me} tournament={tournament} />
            )}
          />
          <Route
            path={Pages.tournament}
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
