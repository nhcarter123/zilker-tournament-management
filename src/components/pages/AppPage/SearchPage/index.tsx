import React, { useContext } from 'react';

import Spinner from 'components/Spinner';

import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MY_TOURNAMENT } from 'graphql/queries/queries';
import { Page } from 'types/page';
import { Tournament } from 'types/types';
import { MyTournamentContext } from 'context/myTournamentContext';

const SearchPage = (): JSX.Element => {
  const { setMyTournamentId } = useContext(MyTournamentContext);
  const history = useHistory();

  useQuery<{
    getMyTournament: Nullable<Tournament>;
  }>(GET_MY_TOURNAMENT, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data.getMyTournament?._id) {
        setMyTournamentId(data.getMyTournament._id);
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
