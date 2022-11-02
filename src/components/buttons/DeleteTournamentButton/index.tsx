import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { UPDATE_TOURNAMENT } from 'graphql/definitions/mutations';
import { GET_MY_TOURNAMENT } from 'graphql/definitions/queries';
import { onError } from 'graphql/errorHandler';
import { Box } from '@mui/material/';
import { Page } from 'types/page';
import { useHistory } from 'react-router-dom';

type DeleteTournamentButtonProps = {
  tournamentId: string;
};

const DeleteTournamentButton = ({
  tournamentId
}: DeleteTournamentButtonProps): JSX.Element => {
  const history = useHistory();

  const [updateTournament, { loading }] = useMutation(UPDATE_TOURNAMENT, {
    refetchQueries: [GET_MY_TOURNAMENT],
    awaitRefetchQueries: true,
    onCompleted: () => {
      history.push(Page.Home + history.location.search);
    },
    onError
  });

  return (
    <Box mt={1}>
      <Popconfirm
        title="Are you sure?"
        onConfirm={(): void => {
          void updateTournament({
            variables: {
              tournamentId: tournamentId,
              payload: { isDeleted: true }
            }
          });
        }}
      >
        <Button
          type="ghost"
          icon={<DeleteOutlined />}
          loading={loading}
          block
          danger
        >
          Delete Tournament
        </Button>
      </Popconfirm>
    </Box>
  );
};

export default DeleteTournamentButton;
