import React from 'react';
import { Button } from 'antd';
import { Box } from '@mui/material/';
import { useMutation } from '@apollo/client';
import { CREATE_TOURNAMENT } from 'graphql/definitions/mutations';
import { GET_TOURNAMENTS } from 'graphql/definitions/queries';
import { onError } from 'graphql/errorHandler';

const AddTournamentButton = (): JSX.Element => {
  const [createTournament, { loading }] = useMutation(CREATE_TOURNAMENT, {
    onError,
    refetchQueries: [GET_TOURNAMENTS],
    awaitRefetchQueries: true
  });

  return (
    <Box display={'flex'} justifyContent={'center'} mr={1} mb={1}>
      <Button
        type={'primary'}
        onClick={(): void =>
          void createTournament({ variables: { name: 'New Tournament' } })
        }
        loading={loading}
        block
      >
        Create
      </Button>
    </Box>
  );
};

export default AddTournamentButton;
