import React from 'react';

import Spinner from 'components/Spinner';

import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MY_TOURNAMENT } from 'graphql/queries/queries';
import { Page } from 'types/page';
import { Tournament } from 'types/types';

const SearchPage = (): JSX.Element => {
  const history = useHistory();

  useQuery<{
    getMyTournament: Nullable<Tournament>;
  }>(GET_MY_TOURNAMENT, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (data.getMyTournament?._id) {
        history.push(
          Page.Tournament.replace(':tournamentId', data.getMyTournament._id)
        );
      } else {
        history.push(Page.Tournaments);
      }
    }
  });

  return <Spinner />;
};

export default SearchPage;
