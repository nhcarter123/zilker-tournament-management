import React, { useContext } from 'react';
import { Button } from 'antd';
import { Box } from '@mui/material/';

import { useMutation } from '@apollo/client';
import { JOIN_TOURNAMENT } from 'graphql/mutations/mutations';
import { GET_TOURNAMENT } from 'graphql/queries/queries';
import { onError } from 'graphql/errorHandler';
import { UserContext } from 'context/userContext';

interface AddTournamentButtonProps {
  tournamentId: string;
}

const JoinTournamentButton = ({
  tournamentId
}: AddTournamentButtonProps): JSX.Element => {
  const me = useContext(UserContext);

  const [joinTournament, { loading }] = useMutation(JOIN_TOURNAMENT, {
    refetchQueries: [GET_TOURNAMENT],
    onError
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
