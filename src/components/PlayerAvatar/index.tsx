import React from 'react';
import { User } from 'types/types';
import { Avatar, Box, Typography } from '@mui/material/';

interface PlayPageProps {
  player: User;
}

// todo as helper
const getFirstLetter = (name: string): string =>
  name.substr(0, 1).toUpperCase();

// todo as helper
const getColorFromName = (name: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const rgb = [];

  for (i = 0; i < 3; i += 1) {
    let value = ((hash >> (i * 16)) & 0xff) - 50;

    if (value > 220) {
      value -= 30;
    }

    if (value < 30) {
      value += 30;
    }

    rgb.push(value);
  }

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

const PlayerAvatar = ({ player }: PlayPageProps): JSX.Element => {
  return (
    <Box display={'flex'} justifyContent={'center'} mb={1}>
      <Avatar
        sx={{
          bgcolor: getColorFromName(`${player.firstName}${player.lastName}`),
          width: '60px',
          height: '60px'
        }}
      >
        <Typography color={'inherit'} variant={'h6'}>
          {`${getFirstLetter(player.firstName || '')}${getFirstLetter(
            player.lastName || ''
          )}`}
        </Typography>
      </Avatar>
    </Box>
  );
};

export default PlayerAvatar;
