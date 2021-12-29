import React, { useContext } from 'react';
import { Route, useHistory, useLocation, useParams } from 'react-router-dom';
import { NetworkStatus, useQuery } from '@apollo/client';

import Spinner from 'components/Spinner';
import JoinPage from 'components/pages/AppPage/TournamentPage/JoinPage';
import WaitingPage from 'components/pages/AppPage/TournamentPage/WaitingPage';
import MatchPage from 'components/pages/AppPage/TournamentPage/MatchPage';
import DetailsPage from 'components/pages/AppPage/TournamentPage/DetailsPage';
import UpcomingPage from 'components/pages/AppPage/TournamentPage/UpcomingPage';

import { GET_ACTIVE_TOURNAMENT, GET_TOURNAMENT } from 'graphql/queries/queries';
import { Tournament, TournamentStatus, User } from 'types/types';
import { Page } from 'types/page';
import { UserContext } from 'context/userContext';
import { Box } from '@mui/material';

const getNavigationTarget = (tournament: Tournament, me: Nullable<User>) => {
  const inTournament = tournament.players.includes(me?._id || '');

  if (!inTournament) {
    return Page.Join.replace(':tournamentId', tournament._id);
  } else if (!tournament.rounds.length) {
    return Page.Waiting.replace(':tournamentId', tournament._id);
  } else {
    return Page.Match.replace(':tournamentId', tournament._id).replace(
      ':matchId',
      'find'
    );
  }
};

const TournamentPage = (): JSX.Element => {
  const me = useContext(UserContext);
  const history = useHistory();
  const page = useLocation().pathname;
  const { tournamentId } = useParams<{ tournamentId: string }>();

  const isDetailsPage = page.includes('/details');

  const skipGetActiveTournament =
    tournamentId !== 'find' && tournamentId !== 'upcoming';

  const { loading: loadingGetActiveTournament } = useQuery<{
    getActiveTournament: Nullable<Tournament>;
  }>(GET_ACTIVE_TOURNAMENT, {
    skip: skipGetActiveTournament,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const tournament = data?.getActiveTournament;
      if (tournament) {
        history.push(getNavigationTarget(tournament, me));
      } else {
        history.push(Page.Upcoming);
      }
    }
  });

  const {
    data: tournamentData,
    loading: loadingTournament,
    networkStatus
  } = useQuery<{
    getTournament: Nullable<Tournament>;
  }>(GET_TOURNAMENT, {
    skip: !skipGetActiveTournament, // these queries should be opposites and never run together
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      tournamentId
    },
    onCompleted: (data) => {
      const tournament = data?.getTournament || null;

      if (tournament && !isDetailsPage) {
        if (tournament.status !== TournamentStatus.Active) {
          return history.push(Page.Upcoming);
        }

        history.push(getNavigationTarget(tournament, me));
      }
    }
  });

  const tournament = tournamentData?.getTournament || null;

  return (
    <>
      {loadingGetActiveTournament ||
      (loadingTournament && networkStatus !== NetworkStatus.refetch) ? (
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
          />
          <Route
            path={Page.Waiting}
            render={(): JSX.Element => <WaitingPage />}
          />
          <Route
            path={Page.Match}
            render={(): JSX.Element => <MatchPage tournament={tournament} />}
          />
          <Route
            path={Page.Details}
            render={(): JSX.Element => <DetailsPage tournament={tournament} />}
          />
          <Route path={Page.Upcoming} component={UpcomingPage} />
        </Box>
      )}
    </>
  );
};

export default TournamentPage;
