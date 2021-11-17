import React from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';

import { Box, Typography, Divider } from '@mui/material/';
import Spinner from 'components/Spinner';
import TournamentHeader from 'components/TournamentHeader';
import TournamentRounds from 'components/pages/app/TournamentPage/TournamentRounds';
import PlayerListItem from 'components/PlayerListItem';

import { GET_TOURNAMENT, GET_USERS } from 'graphql/queries/queries';
import { Tournament, User } from 'types/types';

interface PlayPageProps {
  isAdmin: boolean;
}

const TournamentPage = ({ isAdmin }: PlayPageProps): JSX.Element => {
  const { tournamentId } = useParams<{ tournamentId: string }>();

  const [getUsers, { data: usersData, loading: userDataLoading }] =
    useLazyQuery<{
      getUsers: Nullable<User[]>;
    }>(GET_USERS);

  const { data: tournamentData, loading } = useQuery<{
    getTournament: Nullable<Tournament>;
  }>(GET_TOURNAMENT, {
    variables: {
      tournamentId
    },
    onCompleted: (data) => {
      if (data.getTournament?.players) {
        getUsers({ variables: { userIds: data.getTournament?.players } });
      }
    }
  });

  const tournament = tournamentData?.getTournament;
  const users = usersData?.getUsers;

  // todo implement this for all users with isAdmin
  console.log(isAdmin);

  return (
    <>
      {loading || userDataLoading ? (
        <Spinner />
      ) : (
        tournament &&
        users && (
          <>
            <TournamentHeader tournament={tournament} />

            <TournamentRounds tournament={tournament} users={users} />

            <Divider />

            <Typography variant={'h5'} align={'center'} mb={1} mt={2}>
              {`Players (${tournament.players.length})`}
            </Typography>

            {users.map((user, index) => (
              <PlayerListItem
                key={index}
                user={user}
                tournamentId={tournamentId}
              />
            ))}

            <Box mt={8}>
              <Divider />
            </Box>
          </>
        )
      )}
    </>
  );
};

export default TournamentPage;
