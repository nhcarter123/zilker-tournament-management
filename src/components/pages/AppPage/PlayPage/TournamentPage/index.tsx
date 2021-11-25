import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import MatchPage from 'components/pages/AppPage/PlayPage/TournamentPage/MatchPage';
import WaitingPage from 'components/pages/AppPage/PlayPage/TournamentPage/WaitingPage';

import { Page } from 'types/page';
import { useQuery } from '@apollo/client';
import { Match } from 'types/types';
import { GET_MY_MATCH } from 'graphql/queries/queries';

const TournamentPage = (): JSX.Element => {
  const history = useHistory();

  const { loading } = useQuery<{
    getMyMatch: Nullable<Match>;
  }>(GET_MY_MATCH, {
    onCompleted: (data) => {
      if (data?.getMyMatch) {
        history.push(Page.Match.replace(':matchId', data.getMyMatch._id));
      }
    }
  });

  console.log(loading);

  return (
    <>
      <Route path={Page.Waiting} component={WaitingPage} />
      <Route path={Page.Match} component={MatchPage} />
    </>
  );
};

export default TournamentPage;
