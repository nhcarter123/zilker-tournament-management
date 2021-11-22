import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';

import { Box } from '@mui/material/';
import Spinner from 'components/Spinner';
import TournamentRounds from 'components/pages/AppPage/TournamentPage/TournamentRounds';
import TournamentPlayers from './TournamentPlayers';

import { GET_TOURNAMENT, GET_USERS } from 'graphql/queries/queries';
import { Tournament, User } from 'types/types';

const TournamentPage = (): JSX.Element => {
  const [tournamentLoaded, setTournamentLoaded] = useState<boolean>(false);
  const [selectedRound, setSelectedRound] = useState<Nullable<string>>(null);
  const { tournamentId } = useParams<{ tournamentId: string }>();

  const [getUsers, { data: usersData, loading: userDataLoading }] =
    useLazyQuery<{
      getUsers: Nullable<User[]>;
    }>(GET_USERS);

  const { data: tournamentData, loading } = useQuery<{
    getTournament: Nullable<Tournament>;
  }>(GET_TOURNAMENT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      tournamentId
    },
    onCompleted: (data) => {
      if (data.getTournament?.players) {
        const standings = data.getTournament?.standings;

        getUsers({
          variables: {
            userIds: standings.length
              ? standings.map((standing) => standing.userId)
              : data.getTournament?.players
          }
        });
      }

      if (data.getTournament?.rounds.length) {
        setSelectedRound(
          data.getTournament.rounds[data.getTournament.rounds.length - 1]._id
        );
      }

      // todo: bug: this can prevent loading in a rare case that we want it
      setTournamentLoaded(true);
    }
  });

  const tournament = tournamentData?.getTournament;
  const users = usersData?.getUsers;

  // todo
  // add bold
  // active tournament toggle
  // footer?
  // leave tournament button

  return (
    <>
      {(loading || userDataLoading) && !tournamentLoaded ? (
        <Spinner />
      ) : (
        tournament &&
        users && (
          <>
            <TournamentRounds
              users={users}
              tournament={tournament}
              selectedRound={selectedRound}
              setSelectedRound={setSelectedRound}
            />
            <TournamentPlayers users={users} tournament={tournament} />
            <Box mt={6}>ㅤ</Box> {/*// give some space at the bottom*/}
          </>
        )
      )}
    </>
  );
};

export default TournamentPage;
