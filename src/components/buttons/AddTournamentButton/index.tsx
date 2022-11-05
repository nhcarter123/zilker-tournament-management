import React from 'react';
import { Button } from 'antd';
import { Box } from '@mui/material/';
import { useMutation } from '@apollo/client';
import { CREATE_TOURNAMENT } from 'graphql/definitions/mutations';
import { GET_TOURNAMENTS } from 'graphql/definitions/queries';
import { onError } from 'graphql/errorHandler';
import { Tournament } from 'types/types';
import { Page } from 'types/page';
import { useHistory } from 'react-router-dom';

const AddTournamentButton = (): JSX.Element => {
  const history = useHistory();

  const [createTournament, { loading }] = useMutation<{
    createTournament: Nullable<Tournament>;
  }>(CREATE_TOURNAMENT, {
    onCompleted: (data) => {
      const newTournamentId = data.createTournament?._id;
      if (newTournamentId) {
        history.push(
          Page.ViewTournament.replace(':tournamentId', newTournamentId) +
            history.location.search
        );
      }
    },
    onError,
    refetchQueries: [GET_TOURNAMENTS],
    awaitRefetchQueries: true
  });

  return (
    <Box width={'100%'} mb={1.5}>
      <Button
        type={'primary'}
        onClick={(): void =>
          void createTournament({ variables: { name: 'New Tournament' } })
        }
        loading={loading}
        block
      >
        Create event
      </Button>
    </Box>
  );
};

export default AddTournamentButton;
