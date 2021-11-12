import React from 'react';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { JOIN_TOURNAMENT } from 'graphql/mutations/mutations';
import { GET_ACTIVE_TOURNAMENT } from 'graphql/queries/queries';
import { onError } from 'graphql/errorHandler';
import { useStyles } from 'components/buttons/JoinTournamentButton/styles';

interface AddTournamentButtonProps {
  tournamentId: string;
  userId: string;
}

const AddTournamentButton = ({
  tournamentId,
  userId
}: AddTournamentButtonProps): JSX.Element => {
  const classes = useStyles();

  const [joinTournament, { loading }] = useMutation(JOIN_TOURNAMENT, {
    refetchQueries: [GET_ACTIVE_TOURNAMENT],
    onError
  });

  return (
    <Button
      size={'large'}
      type="primary"
      loading={loading}
      className={classes.root}
      onClick={(): void => {
        joinTournament({ variables: { tournamentId, userId } });
      }}
    >
      Join
    </Button>
  );
};

export default AddTournamentButton;
