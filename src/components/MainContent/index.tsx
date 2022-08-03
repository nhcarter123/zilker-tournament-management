import React, { useContext, useEffect } from 'react';
import { matchPath, Route, useHistory, useLocation } from 'react-router-dom';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';
import { uniq } from 'lodash';

import TournamentPage from 'components/pages/AppPage/TournamentPage';
import TournamentsPage from 'components/pages/AppPage/TournamentsPage';
import RulesPage from 'components/pages/AppPage/RulesPage';
import ProfilePage from 'components/pages/AppPage/ProfilePage';
import CommunityPage from 'components/pages/AppPage/CommunityPage';
import StatsPage from 'components/pages/AppPage/StatsPage';
import DonatePage from 'components/pages/AppPage/DonatePage';

import {
  GET_MY_MATCH,
  GET_MY_TOURNAMENT,
  GET_TOURNAMENT
} from 'graphql/definitions/queries';
import {
  MatchWithUserInfo,
  Tournament,
  TournamentUpdatedData,
  TournamentUpdatedVariables
} from 'types/types';
import { Page } from 'types/page';
import { TOURNAMENT_UPDATED } from 'graphql/definitions/subscriptions';
import { MyTournamentContext } from 'context/myTournamentContext';
import { useSubscription } from '@apollo/client';

const MainContent = (): JSX.Element => {
  const history = useHistory();
  const { myTournamentId, setMyTournamentId } = useContext(MyTournamentContext);
  const page = useLocation().pathname;
  const match = matchPath<{ tournamentId?: string }>(page, {
    path: Page.Tournament,
    exact: false,
    strict: false
  });
  const idFromRoute = match?.params.tournamentId || null;
  const tournamentId = idFromRoute || myTournamentId;

  const {
    data: myMatchData,
    loading: myMatchLoading,
    refetch: refetchMatch
  } = useQueryWithReconnect<
    {
      getMyMatch: Nullable<MatchWithUserInfo>;
    },
    { tournamentId: string }
  >(GET_MY_MATCH, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    ...(myTournamentId
      ? { variables: { tournamentId: myTournamentId } }
      : { skip: true })
  });

  useEffect(() => {
    const matchId = myMatchData?.getMyMatch?._id;

    const savedMatch = localStorage.getItem('savedMatch');

    if (matchId && savedMatch !== matchId) {
      localStorage.setItem('savedMatch', matchId);

      if (myTournamentId) {
        const target = Page.Tournament.replace(':tournamentId', myTournamentId);

        history.push(target + history.location.search);
      }
    }
  }, [history, myTournamentId, myMatchData]);

  useEffect(() => {
    if (page === Page.Tournament.replace(':tournamentId', '')) {
      if (myTournamentId) {
        history.push(
          Page.Tournament.replace(':tournamentId', myTournamentId) +
            history.location.search
        );
        void refetchMatch();
      } else {
        history.push(Page.Tournaments + history.location.search);
      }
    }
  }, [myTournamentId, history, page, refetchMatch]);

  const { data, loading } = useQueryWithReconnect<
    {
      getTournament: Nullable<Tournament>;
    },
    { tournamentId: string }
  >(GET_TOURNAMENT, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    ...(tournamentId ? { variables: { tournamentId } } : { skip: true })
  });

  useQueryWithReconnect<{
    getMyTournament: Nullable<Tournament>;
  }>(GET_MY_TOURNAMENT, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onCompleted: (data) => {
      const newTournamentId = data.getMyTournament?._id;
      if (newTournamentId && newTournamentId !== myTournamentId) {
        setMyTournamentId(newTournamentId);
      }
    }
  });

  const subscribedTournaments = uniq(
    [idFromRoute, myTournamentId].flatMap((v) => (v ? [v] : []))
  );

  useSubscription<TournamentUpdatedData, TournamentUpdatedVariables>(
    TOURNAMENT_UPDATED,
    {
      ...(subscribedTournaments.length
        ? { variables: { tournamentIds: subscribedTournaments } }
        : { skip: true }),
      onSubscriptionData: (data) => {
        if (
          data.subscriptionData.data?.tournamentUpdated?.newRound &&
          data.subscriptionData.data.tournamentUpdated.tournament._id ===
            myTournamentId
        ) {
          void refetchMatch();

          // const target = Page.Tournament.replace(
          //   ':tournamentId',
          //   myTournamentId || ''
          // );
          //
          // if (page !== target) {
          //   history.push(target);
          // }
        }
      }
    }
  );

  const tournament = data?.getTournament || null;
  const myMatch = myMatchData?.getMyMatch || null;

  return (
    <>
      <Route path={Page.Profile} component={ProfilePage} />
      <Route path={Page.Community} component={CommunityPage} />
      <Route path={Page.Rules} component={RulesPage} />
      <Route path={Page.Donate} component={DonatePage} />
      <Route path={Page.Stats} component={StatsPage} />
      <Route path={Page.Tournaments} component={TournamentsPage} />
      <Route
        path={Page.Tournament}
        render={(): JSX.Element => (
          <TournamentPage
            tournament={tournament}
            loading={loading}
            myMatch={myMatch}
            myMatchLoading={myMatchLoading}
          />
        )}
      />
    </>
  );
};

export default MainContent;
