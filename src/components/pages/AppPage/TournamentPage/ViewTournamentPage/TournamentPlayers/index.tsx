import React from 'react';

import { Box, Divider, Typography } from '@mui/material/';

import { Tournament, User } from 'types/types';
import PlayerListItem from 'components/PlayerListItem';
import { find } from 'lodash';

interface TournamentRoundsProps {
  users: User[];
  tournament: Tournament;
}

const TournamentPlayers = ({
  tournament,
  users
}: TournamentRoundsProps): JSX.Element => {
  // todo move this mess to helper
  const sortedUsers = [...users].sort((a, b) => {
    const standingA = find(
      tournament.standings,
      (standing) => standing.userId === a._id
    ) || { position: Infinity };

    const standingB = find(
      tournament.standings,
      (standing) => standing.userId === b._id
    ) || { position: Infinity };

    return standingA.position - standingB.position || b.rating - a.rating;
  });

  return (
    <>
      <Divider />

      <Typography variant={'h5'} align={'center'} mb={1} mt={2}>
        {`Players (${tournament.players.length})`}
      </Typography>
      <Box
        sx={{
          '&>:nth-of-type(2n+1)': {
            background: '#f6f6f6'
          }
        }}
      >
        {sortedUsers.map((user, index) => (
          <PlayerListItem
            key={index}
            index={index}
            standing={find(
              tournament.standings,
              (standing) => standing.userId === user._id
            )}
            isInTournament={tournament.players.includes(user._id)}
            user={user}
            tournament={tournament}
          />
        ))}
      </Box>
    </>
  );
};

export default TournamentPlayers;
