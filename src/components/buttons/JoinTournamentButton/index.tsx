import React, { useContext } from 'react';
import { Button } from 'antd';
import { Box } from '@mui/material/';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { JOIN_TOURNAMENT } from 'graphql/definitions/mutations';
import { onError } from 'graphql/errorHandler';
import { UserContext } from 'context/userContext';
import { Page } from 'types/page';
import { MyTournamentContext } from 'context/myTournamentContext';

interface JoinTournamentButtonProps {
  tournamentId: string;
}

const JoinTournamentButton = ({
  tournamentId
}: JoinTournamentButtonProps): JSX.Element => {
  const me = useContext(UserContext);
  const { setMyTournamentId } = useContext(MyTournamentContext);
  const history = useHistory();

  const [joinTournament, { loading }] = useMutation<{
    joinTournament?: { tournamentId: string };
  }>(JOIN_TOURNAMENT, {
    onError,
    onCompleted: (data) => {
      if (data.joinTournament?.tournamentId) {
        setMyTournamentId(data.joinTournament.tournamentId);
        history.push(
          Page.Tournament.replace(
            ':tournamentId',
            data.joinTournament.tournamentId
          ) + history.location.search
        );
      }
    }
  });

  return (
    <Box ml={1}>
      <Button
        size={'large'}
        type="default"
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
