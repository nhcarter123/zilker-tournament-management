import React, { useContext, useEffect } from 'react';
import { matchPath, Route, useHistory, useLocation } from 'react-router-dom';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';

import TournamentPage from 'components/pages/AppPage/TournamentPage';
import TournamentsPage from 'components/pages/AppPage/TournamentsPage';
import RulesPage from 'components/pages/AppPage/RulesPage';
import ProfilePage from 'components/pages/AppPage/ProfilePage';
import SocialPage from 'components/pages/AppPage/SocialPage';
import DonatePage from 'components/pages/AppPage/DonatePage';

import {
  GET_MY_MATCH,
  GET_MY_TOURNAMENT,
  GET_TOURNAMENT
} from 'graphql/queries/queries';
import {
  MatchWithUserInfo,
  Tournament,
  TournamentUpdateData
} from 'types/types';
import { Page } from 'types/page';
import { TOURNAMENT_UPDATED } from 'graphql/subscriptions/subscriptions';
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
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { tournamentId: tournamentId || '' },
    skip: !tournamentId
  });

  useEffect(() => {
    if (page === Page.Tournament.replace(':tournamentId', '')) {
      if (myTournamentId) {
        history.push(Page.Tournament.replace(':tournamentId', myTournamentId));
        void refetchMatch();
      } else {
        history.push(Page.Tournaments);
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
    variables: { tournamentId: tournamentId || '' },
    skip: !tournamentId
  });

  const { data: myTournamentData } = useQueryWithReconnect<{
    getMyTournament: Nullable<Tournament>;
  }>(GET_MY_TOURNAMENT, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  useEffect(() => {
    const newTournamentId = myTournamentData?.getMyTournament?._id;
    if (newTournamentId && newTournamentId !== myTournamentId) {
      setMyTournamentId(newTournamentId);
    }
  }, [setMyTournamentId, myTournamentData, myTournamentId]);

  useSubscription<TournamentUpdateData>(TOURNAMENT_UPDATED, {
    variables: { tournamentId: myTournamentId },
    skip: !myTournamentId,
    onSubscriptionData: (data) => {
      if (data.subscriptionData.data?.tournamentUpdated?.newRound) {
        void refetchMatch();

        const target = Page.Tournament.replace(
          ':tournamentId',
          myTournamentId || ''
        );

        if (page !== target) {
          history.push(target);
        }
      }
    }
  });

  const tournament = data?.getTournament || null;
  const myMatch = myMatchData?.getMyMatch || null;

  return (
    <>
      <Route path={Page.Profile} component={ProfilePage} />
      <Route path={Page.Social} component={SocialPage} />
      <Route path={Page.Rules} component={RulesPage} />
      <Route path={Page.Donate} component={DonatePage} />
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
