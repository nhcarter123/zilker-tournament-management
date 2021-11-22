import React, { useContext } from 'react';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { JOIN_TOURNAMENT } from 'graphql/mutations/mutations';
import { GET_ACTIVE_TOURNAMENT } from 'graphql/queries/queries';
import { onError } from 'graphql/errorHandler';
import { useStyles } from 'components/buttons/JoinTournamentButton/styles';
import { UserContext } from '../../../context/userContext';

interface AddTournamentButtonProps {
  tournamentId: string;
}

const AddTournamentButton = ({
  tournamentId
}: AddTournamentButtonProps): JSX.Element => {
  const me = useContext(UserContext);
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
        me && joinTournament({ variables: { tournamentId, userId: me._id } });
      }}
    >
      Join
    </Button>
  );
};

export default AddTournamentButton;
