import React, { Dispatch } from 'react';

import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { GET_TOURNAMENT } from 'graphql/queries/queries';
import { DELETE_ROUND } from 'graphql/mutations/mutations';

import { Button, Popconfirm } from 'antd';
import { Box, Typography, Divider } from '@mui/material';
import RoundStatusDetail from 'components/RoundListItem/RoundStatusDetail';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Tournament, RoundPreview, User } from 'types/types';
import { DeleteOutlined } from '@ant-design/icons';

interface RoundListItemProps {
  index: number;
  isAdmin: boolean;
  selectedRound: Nullable<string>;
  setSelectedRound: Dispatch<React.SetStateAction<Nullable<string>>>;
  tournament: Tournament;
  users: User[];
  roundPreview: RoundPreview;
  isLastRound: boolean;
}

const RoundListItem = ({
  index,
  isAdmin,
  selectedRound,
  setSelectedRound,
  roundPreview,
  tournament,
  users,
  isLastRound
}: RoundListItemProps): JSX.Element => {
  const [deleteRound, { loading }] = useMutation(DELETE_ROUND, {
    refetchQueries: [GET_TOURNAMENT],
    onError
  });

  return (
    <Box
      key={index}
      onClick={(): void =>
        roundPreview._id === selectedRound
          ? setSelectedRound(null)
          : setSelectedRound(roundPreview._id)
      }
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        pt={1}
        pb={1}
      >
        <Typography variant={'h6'}>{`Round ${index + 1}`}</Typography>

        {isLastRound ? (
          isAdmin && (
            <Popconfirm
              title="Are you sure?"
              placement={'left'}
              onConfirm={(e): void => {
                e?.stopPropagation();
                deleteRound({
                  variables: {
                    tournamentId: tournament._id,
                    roundId: roundPreview._id
                  }
                });
              }}
            >
              <Button
                type={'primary'}
                shape="circle"
                icon={<DeleteOutlined />}
                loading={loading}
                onClick={(e): void => e.stopPropagation()}
              />
            </Popconfirm>
          )
        ) : (
          <CheckCircleIcon color={'success'} />
        )}
      </Box>

      <Box>
        {selectedRound === roundPreview._id && (
          <RoundStatusDetail
            users={users}
            tournament={tournament}
            roundPreview={roundPreview}
          />
        )}
      </Box>

      <Divider />
    </Box>
  );
};

export default RoundListItem;
