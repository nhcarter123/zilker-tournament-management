import React from 'react';

import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { GET_TOURNAMENT } from 'graphql/queries/queries';
import { DELETE_ROUND } from 'graphql/mutations/mutations';

import { Button, Popconfirm } from 'antd';
import { Box, Typography, Divider } from '@mui/material';
import RoundStatusDetail from 'components/RoundListItem/RoundStatusDetail';

import { Tournament, Round } from 'types/types';
import { DeleteOutlined } from '@ant-design/icons';

interface RoundListItemProps {
  index: number;
  tournament: Tournament;
  round: Round;
}

const RoundListItem = ({
  round,
  tournament,
  index
}: RoundListItemProps): JSX.Element => {
  const [deleteRound, { loading }] = useMutation(DELETE_ROUND, {
    refetchQueries: [GET_TOURNAMENT],
    onError
  });

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        pt={1.5}
        pb={1.5}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant={'h6'}>{`Round ${index + 1}`}</Typography>
          {!round.completed && (
            <RoundStatusDetail tournament={tournament} round={round} />
          )}
        </Box>

        {!round.completed && (
          <Popconfirm
            title="Are you sure?"
            placement={'left'}
            onConfirm={(): void => {
              deleteRound({
                variables: { tournamentId: tournament._id, roundId: round._id }
              });
            }}
          >
            <Button
              type={'primary'}
              shape="circle"
              icon={<DeleteOutlined />}
              loading={loading}
            />
          </Popconfirm>
        )}
      </Box>

      <Divider />
    </>
  );
};

export default RoundListItem;
