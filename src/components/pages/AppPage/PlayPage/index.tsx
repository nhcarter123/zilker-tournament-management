import React, { useContext } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Spinner from 'components/Spinner';
import JoinPage from 'components/pages/AppPage/PlayPage/JoinPage';
import TournamentPage from 'components/pages/AppPage/PlayPage/TournamentPage';

import { GET_ACTIVE_TOURNAMENT } from 'graphql/queries/queries';
import { Tournament } from 'types/types';
import { Page } from 'types/page';
import { UserContext } from 'context/userContext';
import { Box } from '@mui/material/';

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

const PlayPage = (): JSX.Element => {
  const page = useLocation().pathname;
  const me = useContext(UserContext);

  const { data: tournamentData, loading } = useQuery<{
    getActiveTournament: Nullable<Tournament>;
  }>(GET_ACTIVE_TOURNAMENT, {
    // pollInterval: 4000
  });

  const tournament = tournamentData?.getActiveTournament || null;

  const inTournament = tournament?.players.includes(me?._id || '');

  if (!inTournament && page !== Page.Join) {
    return <Redirect to={Page.Join} />;
  }

  if (tournament && inTournament) {
    const stage = getCurrentStage(tournament);
    let target: Page;

    switch (stage) {
      case TournamentStage.Playing:
        target = Page.Tournament;
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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Box
          sx={{ height: '100%' }}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Route
            path={Page.Join}
            render={(): JSX.Element => <JoinPage tournament={tournament} />}
            exact
          />
          <Route path={Page.Tournament} component={TournamentPage} exact />
        </Box>
      )}
    </>
  );
};

export default PlayPage;
