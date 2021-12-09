import React, { useEffect, useState } from 'react';
import { uniq } from 'lodash';
import { useQuery } from '@apollo/client';

import { Box } from '@mui/material/';
import Spinner from 'components/Spinner';
import TournamentRounds from 'components/pages/AppPage/TournamentPage/DetailsPage/TournamentRounds';
import TournamentPlayers from 'components/pages/AppPage/TournamentPage/DetailsPage/TournamentPlayers';

import { GET_USERS } from 'graphql/queries/queries';
import { Tournament, User } from 'types/types';

interface DetailsPageProps {
  tournament: Nullable<Tournament>;
}

const DetailsPage = ({ tournament }: DetailsPageProps): JSX.Element => {
  const [selectedRound, setSelectedRound] = useState<Nullable<string>>(null);

  const standings = tournament?.standings || [];
  const players = tournament?.players || [];
  const userIds = uniq([
    ...standings.map((standing) => standing.userId),
    ...players
  ]);

  useEffect(() => {
    if (tournament?.rounds.length) {
      setSelectedRound(tournament.rounds[tournament.rounds.length - 1]._id);
    }
  }, [tournament]);

  const { data: usersData, loading } = useQuery<{
    getUsers: Nullable<User[]>;
  }>(GET_USERS, { variables: { userIds } });

  const users = usersData?.getUsers;

  // todo
  // active tournament toggle
  // footer?
  // leave tournament button

  return (
    <Box height={'100%'} width={'100%'}>
      {loading ? (
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
    </Box>
  );
};

export default DetailsPage;
