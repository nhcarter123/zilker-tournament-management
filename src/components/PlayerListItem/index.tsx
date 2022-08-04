import React, { useContext } from 'react';

import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';

import { Button, Popconfirm } from 'antd';
import { Box, Typography } from '@mui/material';
import { Standing, Tournament, User } from 'types/types';
import { KICK_PLAYER } from 'graphql/definitions/mutations';
import { UserContext } from 'context/userContext';
import Bold from 'components/Bold';

interface PlayerListItemProps {
  user: User;
  index: number;
  isInTournament: boolean;
  tournament: Tournament;
  standing?: Standing;
}

const PlayerListItem = ({
  user,
  index,
  standing,
  tournament,
  isInTournament
}: PlayerListItemProps): JSX.Element => {
  const me = useContext(UserContext);
  const [kickUser, { loading }] = useMutation(KICK_PLAYER, {
    onError
  });

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={1}
      >
        <Typography sx={{ width: '0' }} mr={4} component={'span'}>
          <Bold>{index + 1} </Bold>
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Box display={'flex'} alignItems={'center'}>
            <Typography
              variant={'h6'}
            >{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography
              ml={1}
              mr={0.5}
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

        {me?.organizationId === tournament.organizationId && isInTournament && (
          <Popconfirm
            title="Are you sure?"
            placement={'left'}
            onConfirm={(): void => {
              void kickUser({
                variables: {
                  tournamentId: tournament._id,
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

      {/*<Divider />*/}
    </>
  );
};

export default PlayerListItem;
