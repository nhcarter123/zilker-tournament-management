import React, { Dispatch, useContext } from 'react';

import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { DELETE_ROUND } from 'graphql/definitions/mutations';

import { Button, Popconfirm } from 'antd';
import { Box, Typography } from '@mui/material';
import RoundStatusDetail from 'components/RoundListItem/RoundStatusDetail';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Tournament, RoundPreview, TournamentStatus, Role } from 'types/types';
import { DeleteOutlined } from '@ant-design/icons';
import { UserContext } from 'context/userContext';

interface RoundListItemProps {
  index: number;
  selectedRound: Nullable<string>;
  setSelectedRound: Dispatch<React.SetStateAction<Nullable<string>>>;
  tournament: Tournament;
  roundPreview: RoundPreview;
  isLastRound: boolean;
}

const RoundListItem = ({
  index,
  selectedRound,
  setSelectedRound,
  roundPreview,
  tournament,
  isLastRound
}: RoundListItemProps): JSX.Element => {
  const me = useContext(UserContext);
  const [deleteRound, { loading }] = useMutation(DELETE_ROUND, {
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
      px={0.5}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        py={1}
      >
        <Typography variant={'h6'}>{`Round ${index + 1}`}</Typography>

        <Box height={'32px'} display={'flex'} alignItems={'center'}>
          {isLastRound && tournament.status !== TournamentStatus.Completed ? (
            (me?.organizationId === tournament.organizationId ||
              me?.role === Role.Admin) && (
              <Popconfirm
                title="Are you sure?"
                placement={'left'}
                onConfirm={(e): void => {
                  e?.stopPropagation();
                  void deleteRound({
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
            <CheckCircleIcon
              color={'success'}
              sx={{ width: 38.5, height: 38.5, marginRight: '-4px' }}
            />
          )}
        </Box>
      </Box>

      <Box>
        {selectedRound === roundPreview._id && (
          <RoundStatusDetail
            tournament={tournament}
            roundPreview={roundPreview}
          />
        )}
      </Box>
    </Box>
  );
};

export default RoundListItem;
