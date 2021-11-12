import React from 'react';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_TOURNAMENT } from 'graphql/mutations/mutations';
import { GET_TOURNAMENTS } from 'graphql/queries/queries';
import { onError } from 'graphql/errorHandler';

const AddTournamentButton = (): JSX.Element => {
  const [createTournament, { loading }] = useMutation(CREATE_TOURNAMENT, {
    refetchQueries: [GET_TOURNAMENTS],
    onError
  });

  return (
    <Button
      size={'large'}
      type="primary"
      onClick={(): void => {
        createTournament({ variables: { name: 'New Tournament' } });
      }}
      loading={loading}
    >
      Create
    </Button>
  );
};

export default AddTournamentButton;
