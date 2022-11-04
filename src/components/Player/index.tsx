import React from 'react';
import { User } from 'types/types';
import { Box, Typography } from '@mui/material/';
import PlayerAvatar from 'components/PlayerAvatar';
import Bold from 'components/Bold';

interface PlayerProps {
  player: Nullable<User>;
  ratingBefore?: number;
  ratingAfter?: number;
  hideAvatar?: boolean;
  matchPoints?: number;
}

const Player = ({
  player,
  hideAvatar,
  ratingBefore,
  ratingAfter,
  matchPoints
}: PlayerProps): JSX.Element => {
  const isPositive = Math.sign((ratingAfter || 0) - (ratingBefore || 0)) >= 0;
  return (
    <Box mb={1}>
      {!hideAvatar && <PlayerAvatar player={player} size={60} />}
      {matchPoints !== undefined && (
        <Box>
          <div>
            <Typography variant="body1">{matchPoints}</Typography>
          </div>
        </Box>
      )}

      <Typography align={'center'} component={'span'}>
        <Bold>{`${player ? player.firstName : 'Opponent'} ${
          player ? player.lastName : ''
        }`}</Bold>
      </Typography>

      <Box mt={-0.5}>
        <Box display={'flex'} justifyContent={'center'}>
          <Typography variant={'subtitle2'}>
            {ratingAfter ? ratingAfter : ratingBefore}
          </Typography>
          {ratingAfter && ratingBefore && (
            <Typography
              ml={0.5}
              color={isPositive ? '#22bc00' : 'error'}
              variant={'subtitle2'}
            >
              {`(${isPositive ? '+' : '-'}${Math.abs(
                ratingAfter - ratingBefore
              )})`}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Player;
