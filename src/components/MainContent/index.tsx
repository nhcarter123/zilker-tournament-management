import React, { useContext, useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';
import { uniq } from 'lodash';

import TournamentPage from 'components/pages/AppPage/TournamentPage';
import TournamentsPage from 'components/pages/AppPage/TournamentsPage';
import HistoryPage from 'components/pages/AppPage/HistoryPage';
import ChallengePage from 'components/pages/AppPage/ChallengePage';
import ProfilePage from 'components/pages/AppPage/ProfilePage';
import CommunityPage from 'components/pages/AppPage/CommunityPage';
import StatsPage from 'components/pages/AppPage/StatsPage';
import DonatePage from 'components/pages/AppPage/DonatePage';
import AboutPage from 'components/pages/AppPage/AboutPage';
import HomePage from 'components/pages/AppPage/HomePage';
import ViewMatchPage from 'components/pages/AppPage/TournamentPage/ViewMatchPage';

import {
  GET_MY_CHALLENGE_MATCH,
  GET_MY_MATCH,
  GET_MY_TOURNAMENT
} from 'graphql/definitions/queries';
import {
  ChallengeUpdatedData,
  ChallengeUpdatedVariables,
  MatchWithUserInfo,
  Tournament,
  TournamentUpdatedData,
  TournamentUpdatedVariables
} from 'types/types';
import { Page } from 'types/page';
import {
  CHALLENGE_UPDATED,
  TOURNAMENT_UPDATED
} from 'graphql/definitions/subscriptions';
import { MyTournamentContext } from 'context/myTournamentContext';
import { useSubscription } from '@apollo/client';
import { UserContext } from 'context/userContext';
import { Box } from '@mui/material';
import { LoginContext } from 'context/loginContext';

const MainContent = (): JSX.Element => {
  const me = useContext(UserContext);
  const { refetchGetMe } = useContext(LoginContext);
  const history = useHistory();
  const {
    tournamentId,
    myTournamentId,
    setMyTournamentId,
    currentTournament,
    currentTournamentLoading
  } = useContext(MyTournamentContext);
  const page = useLocation().pathname;

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

  const {
    data: myChallengeMatchData,
    loading: myChallengeMatchLoading,
    refetch: refetchChallengeMatch
  } = useQueryWithReconnect<{
    getMyChallengeMatch: Nullable<MatchWithUserInfo>;
  }>(GET_MY_CHALLENGE_MATCH, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  useEffect(() => {
    const matchId = myMatchData?.getMyMatch?._id;

    // Looking at the code a while later, no clue what this does or why it uses local storage. >:(
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

  useQueryWithReconnect<{
    getMyTournament: Nullable<Tournament>;
  }>(GET_MY_TOURNAMENT, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !me,
    onCompleted: (data) => {
      const newTournamentId = data.getMyTournament?._id;
      if (newTournamentId && newTournamentId !== myTournamentId) {
        setMyTournamentId(newTournamentId);
      }
    }
  });

  const subscribedTournaments = uniq(
    [tournamentId, myTournamentId].flatMap((v) => (v ? [v] : []))
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
        }
      }
    }
  );

  const myMatch = myMatchData?.getMyMatch || null;
  const myChallengeMatch = myChallengeMatchData?.getMyChallengeMatch || null;

  const myChallengeSubscriptionId = myChallengeMatch
    ? myChallengeMatch.hostId
    : me?._id;

  useSubscription<ChallengeUpdatedData, ChallengeUpdatedVariables>(
    CHALLENGE_UPDATED,
    {
      ...(myChallengeSubscriptionId
        ? { variables: { hostIds: [myChallengeSubscriptionId] } }
        : { skip: true }),
      onSubscriptionData: (data) => {
        console.log(data);
        if (data.subscriptionData.data?.challengeUpdated?.completed) {
          void refetchGetMe();
        }
        void refetchChallengeMatch();
        history.push(Page.Challenge + history.location.search);
      }
    }
  );

  return (
    <Box>
      <Route path={Page.Home} component={HomePage} exact />
      <Route path={Page.Tournaments} component={TournamentsPage} exact />
      <Route path={Page.History} component={HistoryPage} exact />
      <Route path={Page.Profile} component={ProfilePage} />
      <Route path={Page.Community} component={CommunityPage} />
      <Route path={Page.Donate} component={DonatePage} />
      <Route path={Page.About} component={AboutPage} />
      <Route path={Page.Stats} component={StatsPage} />
      {/*<Route path={Page.Rules} component={RulesPage} />*/}

      <Route
        path={Page.Challenge}
        render={() => (
          <ChallengePage
            myChallengeMatchLoading={myChallengeMatchLoading}
            myChallengeMatch={myChallengeMatch}
          />
        )}
        exact
      />

      <Route
        path={Page.ViewSoloMatch}
        render={(): JSX.Element => <ViewMatchPage />}
      />

      <Route
        path={Page.Tournament}
        render={(): JSX.Element => (
          <TournamentPage
            tournament={currentTournament}
            loading={currentTournamentLoading}
            myMatch={myMatch}
            myMatchLoading={myMatchLoading}
          />
        )}
      />
    </Box>
  );
};

export default MainContent;
