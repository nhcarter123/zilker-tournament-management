import React, { useEffect, useState } from 'react';
import { Route, matchPath, useLocation, useHistory } from 'react-router-dom';
import { useQueryWithReconnect } from 'hooks/useQueryWithReconnect';

import TournamentPage from 'components/pages/AppPage/TournamentPage';
import TournamentsPage from 'components/pages/AppPage/TournamentsPage';
import RulesPage from 'components/pages/AppPage/RulesPage';
import ProfilePage from 'components/pages/AppPage/ProfilePage';
import SocialPage from 'components/pages/AppPage/SocialPage';
import DonatePage from 'components/pages/AppPage/DonatePage';

import { GET_TOURNAMENT } from 'graphql/queries/queries';
import { Tournament } from 'types/types';
import { Page } from 'types/page';

const MainContent = (): JSX.Element => {
  const history = useHistory();
  const page = useLocation().pathname;
  const match = matchPath<{ tournamentId?: string }>(page, {
    path: Page.Tournament,
    exact: false,
    strict: false
  });
  const idFromRoute = match?.params.tournamentId || null;

  const [myTournamentId, setMyTournamentId] =
    useState<Nullable<string>>(idFromRoute);

  useEffect(() => {
    if (page === Page.Tournament.replace(':tournamentId', '')) {
      if (myTournamentId) {
        history.push(Page.Tournament.replace(':tournamentId', myTournamentId));
      } else {
        history.push(Page.Tournaments);
      }
    }
  }, [myTournamentId, history, page]);

  useEffect(() => {
    if (idFromRoute && !page.includes('view')) {
      setMyTournamentId(idFromRoute);
    }
  }, [idFromRoute, page]);

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
    skip: !idFromRoute
  });

  const tournament = data?.getTournament || null;

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
            refetchTournament={refetchTournament}
          />
        )}
      />
    </>
  );
};

export default MainContent;
