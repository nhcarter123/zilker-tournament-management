import React, { useContext } from 'react';

import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { GET_TOURNAMENT } from 'graphql/queries/queries';

import { Button, Popconfirm } from 'antd';
import { Box, Typography, Divider } from '@mui/material';
import { Role, Standing, User } from 'types/types';
import { KICK_PLAYER } from 'graphql/mutations/mutations';
import { UserContext } from '../../context/userContext';
import Bold from '../Bold';

interface PlayerListItemProps {
  user: User;
  index: number;
  isInTournament: boolean;
  standing?: Standing;
  tournamentId: string;
}

const PlayerListItem = ({
  user,
  index,
  standing,
  tournamentId,
  isInTournament
}: PlayerListItemProps): JSX.Element => {
  const me = useContext(UserContext);
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
        <Typography sx={{ width: '36px' }} component={'span'}>
          <Bold>{index + 1} </Bold>
        </Typography>
        <Box sx={{ width: '100%' }}>
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
              <Typography variant={'subtitle1'}>
                {`${standing.win} - ${standing.draw} - ${standing.loss} - ${standing.bye}`}
              </Typography>
              <Typography ml={1} variant={'subtitle2'}>
                <Box sx={{ fontSize: '12px', color: '#b7b7b7' }}>(W-D-L-B)</Box>
              </Typography>
            </Box>
          )}
        </Box>

        {me?.role === Role.Admin && isInTournament && (
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
