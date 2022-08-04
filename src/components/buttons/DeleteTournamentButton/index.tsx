import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { UPDATE_TOURNAMENT } from 'graphql/definitions/mutations';
import { GET_TOURNAMENTS } from 'graphql/definitions/queries';
import { onError } from 'graphql/errorHandler';

type DeleteTournamentButtonProps = {
  tournamentId: string;
};

const DeleteTournamentButton = ({
  tournamentId
}: DeleteTournamentButtonProps): JSX.Element => {
  const [updateTournament, { loading }] = useMutation(UPDATE_TOURNAMENT, {
    refetchQueries: [GET_TOURNAMENTS],
    onError
  });

  return (
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
        type="primary"
        shape="circle"
        icon={<DeleteOutlined />}
        loading={loading}
      />
    </Popconfirm>
  );
};

export default DeleteTournamentButton;
