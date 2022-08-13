import React from 'react';

import { Box, Divider, Typography } from '@mui/material/';

import { IUserWithResult, Standing, Tournament, User } from 'types/types';
import PlayerListItem from 'components/PlayerListItem';
import { find } from 'lodash';

interface TournamentRoundsProps {
  users: User[];
  tournament: Tournament;
}

const splitToGroups = (array: Standing[], groupCount: number) => {
  const result = [];
  for (let i = groupCount; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
};

const isUserAWinner = (
  user: User,
  groupedStandings: Standing[][],
  canBeAWinner: boolean
) => {
  let isWinner = false;
  let groupIndex = groupedStandings.findIndex((group) =>
    group.find((standing) => standing.userId === user._id)
  );

  if (groupIndex > -1) {
    const myGroup = groupedStandings[groupIndex];
    if (myGroup && canBeAWinner) {
      const myStanding = myGroup.find(
        (standing) => standing.userId === user._id
      );
      const bestRecord = myGroup.sort((a, b) => b.score - a.score)[0];
      if (myStanding?.score === bestRecord?.score) {
        isWinner = true;
      }
    }
  } else {
    groupIndex = 0;
  }

  return { groupIndex, isWinner };
};

const TournamentPlayers = ({
  tournament,
  users
}: TournamentRoundsProps): JSX.Element => {
  // todo move this mess to helper

  // If the first round has not completed, generate pseudo-standings base off of users list
  const tournamentStandings = tournament.standings.length
    ? [...tournament.standings]
    : [...users].map((user, index) => ({
        _id: user._id,
        userId: user._id,
        position: index,
        score: 0,
        win: 0,
        loss: 0,
        draw: 0,
        bye: 0,
        initialRating: user.rating
      }));

  const standingsByRating = tournamentStandings.sort((a, b) => {
    // legacy support
    const ratingA = users.find((user) => user._id === a.userId)?.rating || 0;
    const ratingB = users.find((user) => user._id === b.userId)?.rating || 0;

    return b.initialRating - a.initialRating || ratingB - ratingA;
  });
  const skillGroups = splitToGroups(
    standingsByRating,
    tournament.config.skillGroupCount
  );

  const sortedUsers: IUserWithResult[] = [...users]
    .sort((a, b) => {
      const standingA = find(
        tournament.standings,
        (standing) => standing.userId === a._id
      ) || { position: Infinity };

      const standingB = find(
        tournament.standings,
        (standing) => standing.userId === b._id
      ) || { position: Infinity };

      return standingA.position - standingB.position || b.rating - a.rating;
    })
    .map((user) => ({
      ...user,
      ...isUserAWinner(user, skillGroups, tournament.rounds.length > 0)
    }));

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
