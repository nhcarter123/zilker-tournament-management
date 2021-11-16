import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

import { Tournament } from 'types/types';

interface TournamentHeaderProps {
  tournament: Tournament;
}

const TournamentHeader = ({
  tournament
}: TournamentHeaderProps): JSX.Element => {
  const currentRound = tournament.rounds.length;
  const totalRounds = tournament.totalRounds;

  return (
    <Box mt={6.5}>
      <Typography variant={'h5'}>{tournament?.name}</Typography>

      <Box display={'flex'} alignItems={'center'}>
        <Box mr={1}>
          {currentRound > 0 && (
            <Typography variant={'h6'}>{`Round ${currentRound}`}</Typography>
          )}
        </Box>

        <Typography variant={'subtitle2'}>(</Typography>
        <Box mr={1}>
          <Typography variant={'subtitle2'}>
            {`${tournament.players.length} player${
              tournament.players.length !== 1 ? 's' : ''
            }`}
          </Typography>
        </Box>

        <Typography variant={'subtitle2'}>{`${totalRounds} rounds`}</Typography>
        <Typography variant={'subtitle2'}>)</Typography>
      </Box>

      <Divider />
    </Box>
  );
};

export default TournamentHeader;
