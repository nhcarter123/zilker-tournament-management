import React from 'react';
import { User } from 'types/types';
import { Box, Typography } from '@mui/material/';
import PlayerAvatar from 'components/PlayerAvatar';

interface PlayerProps {
  player: User;
  hideAvatar?: boolean;
}

const Player = ({ player, hideAvatar }: PlayerProps): JSX.Element => {
  return (
    <Box mt={2} mb={1}>
      {!hideAvatar && <PlayerAvatar player={player} />}

      <Typography
        align={'center'}
      >{`${player.firstName} ${player.lastName}`}</Typography>
      <Box mt={-0.5}>
        <Typography align={'center'} variant={'subtitle2'}>
          {player.rating}
        </Typography>
      </Box>
    </Box>
  );
};

export default Player;
