import React, { useContext, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { Redirect } from 'react-router';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';

import Spinner from 'components/Spinner';
import WaitingPage from 'components/pages/AppPage/TournamentPage/PlayPage/WaitingPage';
import CompletedPage from 'components/pages/AppPage/TournamentPage/PlayPage/CompletedPage';
import MatchPage from 'components/pages/AppPage/TournamentPage/PlayPage/MatchPage';
import { Box } from '@mui/material';

import { GET_MY_MATCH } from 'graphql/queries/queries';
import { UserContext } from 'context/userContext';
import { NEW_ROUND_STARTED } from 'graphql/subscriptions/subscriptions';
import { MatchWithUserInfo, Tournament, TournamentStatus } from 'types/types';
import { Page } from 'types/page';

interface PlayPageProps {
  tournament: Tournament;
  refetchTournament: Function;
}

const PlayPage = ({
  tournament,
  refetchTournament
}: PlayPageProps): JSX.Element => {
  const me = useContext(UserContext);

  const {
    data,
    loading,
    refetch: refetchMatch
  } = useQueryWithReconnect<{
    getMyMatch: Nullable<MatchWithUserInfo>;
  }>(GET_MY_MATCH, {
    fetchPolicy: 'cache-and-network'
  });

  const { data: newRoundData } = useSubscription<{
    newRoundStarted: { tournamentId: string };
  }>(NEW_ROUND_STARTED, {
    variables: { tournamentId: tournament._id }
  });

  useEffect(() => {
    // todo test with onSubData
    if (newRoundData?.newRoundStarted) {
      void refetchMatch();
      void refetchTournament();
    }
  }, [newRoundData, refetchMatch, refetchTournament]);

  const match = data?.getMyMatch || null;

  const contentRouter = () => {
    const inTournament = Boolean(tournament?.players.includes(me?._id || ''));

    if (!inTournament) {
      return <Redirect to={Page.Tournaments} />;
    }

    if (tournament.status === TournamentStatus.Completed) {
      return <CompletedPage tournamentId={tournament._id} />;
    }

    if (match) {
      return <MatchPage match={match} />;
    }

    return (
      <WaitingPage tournamentStarted={Boolean(tournament.rounds.length)} />
    );
  };

  return (
    <>
      {loading && !match ? (
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

export default PlayPage;
