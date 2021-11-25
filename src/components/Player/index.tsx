import React from 'react';
import { User } from 'types/types';
import { Box, Typography } from '@mui/material/';
import PlayerAvatar from 'components/PlayerAvatar';
import Bold from '../Bold';

interface PlayerProps {
  player: User;
  ratingBefore: number;
  ratingAfter?: number;
  hideAvatar?: boolean;
}

const Player = ({
  player,
  hideAvatar,
  ratingBefore,
  ratingAfter
}: PlayerProps): JSX.Element => {
  const isPositive = Math.sign((ratingAfter || 0) - ratingBefore) > 0;
  return (
    <Box mt={2} mb={1}>
      {!hideAvatar && <PlayerAvatar player={player} />}

      <Typography align={'center'}>
        <Bold>{`${player.firstName} ${player.lastName}`}</Bold>
      </Typography>
      <Box mt={-0.5}>
        <Box display={'flex'} justifyContent={'center'}>
          <Typography variant={'subtitle2'}>
            {ratingAfter ? ratingAfter : ratingBefore}
          </Typography>
          {ratingAfter && (
            <>
              <Typography
                ml={0.5}
                color={isPositive ? '#22bc00' : 'error'}
                variant={'subtitle2'}
              >
                {`(${isPositive ? '+' : '-'}${Math.abs(
                  ratingAfter - ratingBefore
                )})`}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Player;
