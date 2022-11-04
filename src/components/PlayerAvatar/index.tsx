import React from 'react';
import { User } from 'types/types';
import { Avatar, Box, Typography } from '@mui/material/';
import { getColorFromName, getFirstLetter } from 'helpers/helpers';

interface PlayPageProps {
  player: Nullable<User>;
  size: number;
}

const PlayerAvatar = ({ player, size }: PlayPageProps): JSX.Element => {
  return (
    <Box display={'flex'} justifyContent={'center'} mb={0.5}>
      <Avatar
        src={player?.photo}
        sx={{
          bgcolor: getColorFromName(
            player ? `${player.firstName}${player.lastName}` : '?'
          ),
          width: size,
          height: size
        }}
      >
        <Typography color={'inherit'} fontSize={size / 3}>
          {player
            ? `${getFirstLetter(player.firstName || '')}${getFirstLetter(
                player.lastName || ''
              )}`
            : '?'}
        </Typography>
      </Avatar>
    </Box>
  );
};

export default PlayerAvatar;
