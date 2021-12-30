import React, { useContext } from 'react';
import { Button } from 'antd';
import { Box } from '@mui/material/';

import { useMutation } from '@apollo/client';
import { JOIN_TOURNAMENT } from 'graphql/mutations/mutations';
import { onError } from 'graphql/errorHandler';
import { UserContext } from 'context/userContext';
import { Page } from 'types/page';
import { useHistory } from 'react-router-dom';

interface AddTournamentButtonProps {
  tournamentId: string;
}

const JoinTournamentButton = ({
  tournamentId
}: AddTournamentButtonProps): JSX.Element => {
  const me = useContext(UserContext);
  const history = useHistory();

  const [joinTournament, { loading }] = useMutation<{
    joinTournament?: { tournamentId: string };
  }>(JOIN_TOURNAMENT, {
    onError,
    onCompleted: (data) => {
      if (data.joinTournament?.tournamentId) {
        history.push(
          Page.Tournament.replace(
            ':tournamentId',
            data.joinTournament.tournamentId
          )
        );
      }
    }
  });

  return (
    <Box ml={1}>
      <Button
        size={'large'}
        type="primary"
        loading={loading}
        onClick={(): void => {
          me && joinTournament({ variables: { tournamentId, userId: me._id } });
        }}
      >
        Join
      </Button>
    </Box>
  );
};

export default JoinTournamentButton;
