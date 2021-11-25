import React from 'react';

import { Typography } from '@mui/material/';

import { Tournament, User } from 'types/types';
import PlayerListItem from '../../../../PlayerListItem';
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

    return standingA.position - standingB.position;
  });

  return (
    <>
      <Typography variant={'h5'} align={'center'} mb={1} mt={2}>
        {`Players (${tournament.players.length})`}
      </Typography>
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
          tournamentId={tournament._id}
        />
      ))}
    </>
  );
};

export default TournamentPlayers;
