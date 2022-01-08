import React, { useContext, useEffect, useState } from 'react';
import { uniq } from 'lodash';
import { useQuery, useSubscription } from '@apollo/client';

import { Box } from '@mui/material/';
import Spinner from 'components/Spinner';
import TournamentRounds from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentRounds';
import TournamentPlayers from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentPlayers';
import TournamentDetails from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentDetails';

import { GET_USERS } from 'graphql/queries/queries';
import { Role, Tournament, TournamentUpdateData, User } from 'types/types';
import { UserContext } from 'context/userContext';
import { TOURNAMENT_UPDATED } from 'graphql/subscriptions/subscriptions';
import { MyTournamentContext } from 'context/myTournamentContext';

interface ViewTournamentPageProps {
  tournament: Nullable<Tournament>;
}

const ViewTournamentPage = ({
  tournament
}: ViewTournamentPageProps): JSX.Element => {
  const [selectedRound, setSelectedRound] = useState<Nullable<string>>(null);
  const { myTournamentId } = useContext(MyTournamentContext);
  const me = useContext(UserContext);
  const isAdmin = me?.role === Role.Admin;

  useSubscription<TournamentUpdateData>(TOURNAMENT_UPDATED, {
    variables: { tournamentId: tournament?._id || '' },
    skip: tournament?._id === myTournamentId
  });

  const mergedTournament = tournament || null;

  const standings = mergedTournament?.standings || [];
  const players = mergedTournament?.players || [];
  const userIds = uniq([
    ...standings.map((standing) => standing.userId),
    ...players
  ]);

  useEffect(() => {
    if (mergedTournament?.rounds.length) {
      setSelectedRound(
        mergedTournament.rounds[mergedTournament.rounds.length - 1]._id
      );
    }
  }, [mergedTournament]);

  const { data: usersData, loading } = useQuery<{
    getUsers: Nullable<User[]>;
  }>(GET_USERS, { variables: { userIds }, fetchPolicy: 'cache-and-network' });

  const users = usersData?.getUsers;

  // todo
  // active tournament toggle
  // footer?
  // leave tournament button
  return (
    <Box sx={{ height: '100%', maxWidth: '360px', width: '100%' }} mx={'auto'}>
      {loading && !users ? (
        <Spinner />
      ) : (
        mergedTournament &&
        users && (
          <>
            {isAdmin && <TournamentDetails tournament={mergedTournament} />}
            <TournamentRounds
              users={users}
              tournament={mergedTournament}
              selectedRound={selectedRound}
              setSelectedRound={setSelectedRound}
            />
            <TournamentPlayers users={users} tournament={mergedTournament} />
            <Box mt={6}>ㅤ</Box> {/*// give some space at the bottom*/}
          </>
        )
      )}
    </Box>
  );
};

export default ViewTournamentPage;
