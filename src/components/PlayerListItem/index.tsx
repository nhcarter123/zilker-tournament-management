import React from 'react';

import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { GET_TOURNAMENT } from 'graphql/queries/queries';

import { Button, Popconfirm } from 'antd';
import { Box, Typography, Divider } from '@mui/material';
import { Standing, User } from 'types/types';
import { KICK_PLAYER } from 'graphql/mutations/mutations';

interface PlayerListItemProps {
  user: User;
  isAdmin: boolean;
  isInTournament: boolean;
  standing?: Standing;
  tournamentId: string;
}

const PlayerListItem = ({
  user,
  isAdmin,
  standing,
  tournamentId,
  isInTournament
}: PlayerListItemProps): JSX.Element => {
  const [kickUser, { loading }] = useMutation(KICK_PLAYER, {
    refetchQueries: [GET_TOURNAMENT],
    onError
  });

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        pt={1}
        pb={1}
      >
        <Box>
          <Box display={'flex'} alignItems={'center'}>
            <Typography
              variant={'h6'}
            >{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography
              ml={1}
              variant={'body2'}
            >{`(${user.rating})`}</Typography>
          </Box>

          {standing && (
            <Box display={'flex'} alignItems={'center'}>
              <Typography
                variant={'subtitle1'}
              >{`Score: ${standing.score}`}</Typography>

              <Typography
                ml={2}
                variant={'subtitle2'}
              >{`${standing.win}x👑`}</Typography>

              <Typography
                ml={1.5}
                variant={'subtitle2'}
              >{`${standing.loss}x😞`}</Typography>

              {standing.draw ? (
                <Typography
                  ml={1.5}
                  variant={'subtitle2'}
                >{`${standing.draw}x🤝`}</Typography>
              ) : null}

              {standing.bye ? (
                <Typography
                  ml={1.5}
                  variant={'subtitle2'}
                >{`${standing.bye}x👋`}</Typography>
              ) : null}
            </Box>
          )}
        </Box>

        {isAdmin && isInTournament && (
          <Popconfirm
            title="Are you sure?"
            placement={'left'}
            onConfirm={(): void => {
              kickUser({
                variables: {
                  tournamentId,
                  userId: user._id
                }
              });
            }}
          >
            <Button size={'middle'} type="primary" loading={loading}>
              Kick
            </Button>
          </Popconfirm>
        )}
      </Box>

      <Divider />
    </>
  );
};

export default PlayerListItem;
