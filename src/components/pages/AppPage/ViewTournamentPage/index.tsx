import React, { useEffect, useState } from 'react';
import { uniq } from 'lodash';
import { useQuery } from '@apollo/client';

import { Box } from '@mui/material/';
import Spinner from 'components/Spinner';
import TournamentRounds from 'components/pages/AppPage/ViewTournamentPage/TournamentRounds';
import TournamentPlayers from 'components/pages/AppPage/ViewTournamentPage/TournamentPlayers';

import { GET_TOURNAMENT, GET_USERS } from 'graphql/queries/queries';
import { Tournament, User } from 'types/types';
import { useParams } from 'react-router-dom';
import TournamentHeader from '../../../MainHeader/TournamentHeader';

const ViewTournamentPage = (): JSX.Element => {
  const [selectedRound, setSelectedRound] = useState<Nullable<string>>(null);
  const { tournamentId } = useParams<{ tournamentId: string }>();

  const { data: tournamentData, loading: loadingTournament } = useQuery<{
    getTournament: Nullable<Tournament>;
  }>(GET_TOURNAMENT, {
    fetchPolicy: 'cache-and-network',
    variables: {
      tournamentId
    }
  });

  const tournament = tournamentData?.getTournament || null;

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
  }>(GET_USERS, { variables: { userIds }, fetchPolicy: 'cache-and-network' });

  const users = usersData?.getUsers;

  // todo
  // active tournament toggle
  // footer?
  // leave tournament button

  return (
    <Box height={'100%'} width={'100%'}>
      <TournamentHeader tournament={tournament} />
      {loading || loadingTournament ? (
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

export default ViewTournamentPage;
