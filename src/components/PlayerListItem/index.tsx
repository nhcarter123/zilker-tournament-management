import React from 'react';

import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { GET_TOURNAMENT } from 'graphql/queries/queries';

import { Button, Popconfirm } from 'antd';
import { Box, Typography, Divider } from '@mui/material';
import { User } from 'types/types';
import { KICK_PLAYER } from 'graphql/mutations/mutations';

interface PlayerListItemProps {
  user: User;
  tournamentId: string;
}

const PlayerListItem = ({
  user,
  tournamentId
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
        <Typography
          variant={'body1'}
        >{`${user.firstName} ${user.lastName}`}</Typography>

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
      </Box>

      <Divider />
    </>
  );
};

export default PlayerListItem;
