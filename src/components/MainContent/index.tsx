import React, { useContext, useEffect } from 'react';
import { matchPath, Route, useHistory, useLocation } from 'react-router-dom';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';

import TournamentPage from 'components/pages/AppPage/TournamentPage';
import TournamentsPage from 'components/pages/AppPage/TournamentsPage';
import RulesPage from 'components/pages/AppPage/RulesPage';
import ProfilePage from 'components/pages/AppPage/ProfilePage';
import SocialPage from 'components/pages/AppPage/SocialPage';
import DonatePage from 'components/pages/AppPage/DonatePage';
import SearchPage from 'components/pages/AppPage/SearchPage';

import { GET_MY_MATCH, GET_TOURNAMENT } from 'graphql/queries/queries';
import { MatchWithUserInfo, Tournament, TournamentStatus } from 'types/types';
import { Page } from 'types/page';
import { useSubscription } from '@apollo/client';
import { NEW_ROUND_STARTED } from '../../graphql/subscriptions/subscriptions';
import { MyTournamentContext } from '../../context/myTournamentContext';
import { UserContext } from '../../context/userContext';

const MainContent = (): JSX.Element => {
  const history = useHistory();
  const me = useContext(UserContext);
  const { myTournamentId, setMyTournamentId } = useContext(MyTournamentContext);
  const page = useLocation().pathname;
  const match = matchPath<{ tournamentId?: string }>(page, {
    path: Page.Tournament,
    exact: false,
    strict: false
  });
  const idFromRoute = match?.params.tournamentId || null;

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
    variables: { tournamentId: idFromRoute || '' },
    skip: !idFromRoute
  });

  useEffect(() => {
    if (page === Page.Tournament.replace(':tournamentId', '')) {
      if (myTournamentId) {
        history.push(Page.Tournament.replace(':tournamentId', myTournamentId));
        void refetchMatch();
      } else {
        history.push(Page.Search);
      }
    }
  }, [myTournamentId, history, page, refetchMatch]);

  // todo add subscriber for tournament

  const {
    data,
    loading,
    refetch: refetchTournament
  } = useQueryWithReconnect<
    {
      getTournament: Nullable<Tournament>;
    },
    { tournamentId: string }
  >(GET_TOURNAMENT, {
    fetchPolicy: 'cache-and-network',
    variables: { tournamentId: idFromRoute || '' },
    skip: !idFromRoute,
    onCompleted: (data) => {
      const tournament = data.getTournament;
      if (
        tournament &&
        tournament.players.includes(me?._id || '') &&
        tournament.status === TournamentStatus.Active
      ) {
        setMyTournamentId(tournament._id);
      } else {
        setMyTournamentId(null);
      }
    }
  });

  const tournament = data?.getTournament || null;
  const myMatch = myMatchData?.getMyMatch || null;

  useSubscription<{
    newRoundStarted: { tournamentId: string };
  }>(NEW_ROUND_STARTED, {
    variables: { tournamentId: myTournamentId },
    skip: !myTournamentId,
    onSubscriptionData: () => {
      void refetchMatch();
      void refetchTournament();

      const target = Page.Tournament.replace(
        ':tournamentId',
        myTournamentId || ''
      );
      if (page !== target) {
        history.push(target);
      }
    }
  });

  return (
    <>
      <Route path={Page.Profile} component={ProfilePage} />
      <Route path={Page.Social} component={SocialPage} />
      <Route path={Page.Rules} component={RulesPage} />
      <Route path={Page.Donate} component={DonatePage} />
      <Route path={Page.Tournaments} component={TournamentsPage} />
      <Route path={Page.Search} component={SearchPage} />
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
