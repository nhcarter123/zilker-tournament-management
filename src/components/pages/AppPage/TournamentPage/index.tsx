import React, { useContext } from 'react';
import { Route, useHistory, useLocation, useParams } from 'react-router-dom';
import { NetworkStatus, useQuery } from '@apollo/client';

import Spinner from 'components/Spinner';
import JoinPage from 'components/pages/AppPage/TournamentPage/JoinPage';
import WaitingPage from 'components/pages/AppPage/TournamentPage/WaitingPage';
import MatchPage from 'components/pages/AppPage/TournamentPage/MatchPage';
import DetailsPage from 'components/pages/AppPage/TournamentPage/DetailsPage';

import { GET_ACTIVE_TOURNAMENT, GET_TOURNAMENT } from 'graphql/queries/queries';
import { Tournament } from 'types/types';
import { Page } from 'types/page';
import { UserContext } from 'context/userContext';
import { Box } from '@mui/material';

const TournamentPage = (): JSX.Element => {
  const me = useContext(UserContext);
  const history = useHistory();
  const page = useLocation().pathname;
  const { tournamentId } = useParams<{ tournamentId: string }>();

  const isDetailsPage = page.includes('/details');

  const { loading: loadingGetActiveTournament } = useQuery<{
    getActiveTournament: Nullable<Partial<Tournament>>;
  }>(GET_ACTIVE_TOURNAMENT, {
    skip: tournamentId !== 'find',
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const tournamentId = data?.getActiveTournament?._id;
      if (tournamentId) {
        history.push(
          `${Page.Tournament.replace(':tournamentId', tournamentId)}`
        );
      } else {
        // todo
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
    skip: tournamentId === 'find',
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      tournamentId
    },
    onCompleted: (data) => {
      const tournament = data?.getTournament || null;

      if (tournament && !isDetailsPage) {
        const inTournament = tournament?.players.includes(me?._id || '');

        if (!tournament.rounds.length) {
          history.push(Page.Waiting.replace(':tournamentId', tournament._id));
        } else if (inTournament) {
          history.push(
            Page.Match.replace(':tournamentId', tournament._id).replace(
              ':matchId',
              'find'
            )
          );
        } else {
          history.push(Page.Join.replace(':tournamentId', tournament._id));
        }
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
        </Box>
      )}
    </>
  );
};

export default TournamentPage;
