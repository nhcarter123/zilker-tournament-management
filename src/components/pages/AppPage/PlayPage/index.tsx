import React, { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';

import Spinner from 'components/Spinner';
import JoinPage from 'components/pages/AppPage/PlayPage/JoinPage';
import WaitingPage from 'components/pages/AppPage/PlayPage/WaitingPage';
import MatchPage from 'components/pages/AppPage/PlayPage/MatchPage';

import { GET_ACTIVE_TOURNAMENT, GET_MY_MATCH } from 'graphql/queries/queries';
import { Match, Tournament } from 'types/types';
import { Page } from 'types/page';
import { UserContext } from 'context/userContext';
import { Box } from '@mui/material/';

const PlayPage = (): JSX.Element => {
  const history = useHistory();
  const me = useContext(UserContext);

  const [getMyMatch, { loading: matchLoading }] = useLazyQuery<{
    getMyMatch: Nullable<Match>;
  }>(GET_MY_MATCH, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (tournament?.rounds.length) {
        history.push(
          Page.Match.replace(':matchId', data?.getMyMatch?._id || 'none')
        );
      } else {
        history.push(Page.Waiting);
      }
    }
  });

  const { data: tournamentData, loading } = useQuery<{
    getActiveTournament: Nullable<Tournament>;
  }>(GET_ACTIVE_TOURNAMENT, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const inTournament = data?.getActiveTournament?.players.includes(
        me?._id || ''
      );

      if (inTournament) {
        getMyMatch();
      } else {
        history.push(Page.Join);
      }
    }
  });

  const tournament = tournamentData?.getActiveTournament || null;

  return (
    <>
      {loading || matchLoading ? (
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
          <Route path={Page.Waiting} component={WaitingPage} />
          <Route path={Page.Match} component={MatchPage} />
        </Box>
      )}
    </>
  );
};

export default PlayPage;
