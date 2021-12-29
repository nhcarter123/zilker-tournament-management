import React, { useContext, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';

import Spinner from 'components/Spinner';
import JoinPage from 'components/pages/AppPage/TournamentPage/JoinPage';
import WaitingPage from 'components/pages/AppPage/TournamentPage/WaitingPage';
import MatchPage from 'components/pages/AppPage/TournamentPage/MatchPage';
import { GET_ACTIVE_TOURNAMENT, GET_MY_MATCH } from 'graphql/queries/queries';
import { MatchWithUserInfo, Tournament } from 'types/types';
import { UserContext } from 'context/userContext';
import { Box } from '@mui/material';
import { NEW_ROUND_STARTED } from 'graphql/subscriptions/subscriptions';
import UpcomingPage from '../UpcomingPage';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';

const TournamentPage = (): JSX.Element => {
  const me = useContext(UserContext);

  const {
    data: tournamentData,
    loading: loadingTournament,
    refetch: refetchTournament
  } = useQuery<{
    getActiveTournament: Nullable<Tournament>;
  }>(GET_ACTIVE_TOURNAMENT, {
    fetchPolicy: 'cache-and-network'
  });

  const { data: matchData, refetch: refetchMatch } = useQueryWithReconnect<{
    getMyMatch: Nullable<MatchWithUserInfo>;
  }>(GET_MY_MATCH, {
    fetchPolicy: 'cache-and-network'
  });

  // todo should we use skip here?
  const { data: newRoundData } = useSubscription<{
    newRoundStarted: { tournamentId: string };
  }>(NEW_ROUND_STARTED, {
    variables: { tournamentId: tournamentData?.getActiveTournament?._id || '' }
  });

  useEffect(() => {
    // todo test with onSubData
    if (newRoundData?.newRoundStarted) {
      void refetchMatch();
      void refetchTournament();
    }
  }, [newRoundData, refetchMatch, refetchTournament]);

  const tournament = tournamentData?.getActiveTournament || null;
  const inTournament = Boolean(tournament?.players.includes(me?._id || ''));
  const match = matchData?.getMyMatch || null;

  const contentRouter = () => {
    if (tournament) {
      if (!inTournament) {
        return <JoinPage tournament={tournament} />;
      }

      if (match) {
        return <MatchPage match={match} tournament={tournament} />;
      }

      return (
        <WaitingPage tournamentStarted={Boolean(tournament.rounds.length)} />
      );
    }

    return <UpcomingPage />;
  };

  return (
    <>
      {loadingTournament ? (
        <Spinner />
      ) : (
        <Box
          sx={{ height: '100%' }}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {contentRouter()}
        </Box>
      )}
    </>
  );
};

export default TournamentPage;
