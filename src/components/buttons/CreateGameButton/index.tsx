import React from 'react';
import { Button } from 'antd';
import { Box } from '@mui/material/';
import { useMutation } from '@apollo/client';
import { CREATE_TOURNAMENT } from 'graphql/definitions/mutations';
import { GET_TOURNAMENTS } from 'graphql/definitions/queries';
import { onError } from 'graphql/errorHandler';

const CreateGameButton = (): JSX.Element => {
  const [createTournament, { loading }] = useMutation(CREATE_TOURNAMENT, {
    onError,
    refetchQueries: [GET_TOURNAMENTS],
    awaitRefetchQueries: true
  });

  return (
    <Box mr={0.5} mb={1} width={'50%'}>
      <Button
        style={{ height: '80px' }}
        type={'primary'}
        size={'large'}
        onClick={(): void =>
          void createTournament({ variables: { name: 'New Tournament' } })
        }
        loading={loading}
        block
      >
        Create game
      </Button>
    </Box>
  );
};

export default CreateGameButton;
