import React, { useContext } from 'react';
import { Button, Popconfirm } from 'antd';
import { UserContext } from 'context/userContext';
import { useMutation } from '@apollo/client';
import { KICK_PLAYER } from 'graphql/mutations/mutations';
import { onError } from 'graphql/errorHandler';
import { Page } from 'types/page';
import { useHistory } from 'react-router-dom';
import { MyTournamentContext } from 'context/myTournamentContext';

interface LeaveTournamentButtonProps {
  tournamentId: string;
}

const LeaveTournamentButton = ({
  tournamentId
}: LeaveTournamentButtonProps): JSX.Element => {
  const history = useHistory();
  const { exitTournament } = useContext(MyTournamentContext);
  const me = useContext(UserContext);
  const [leaveTournament, { loading }] = useMutation(KICK_PLAYER, {
    onError,
    onCompleted: () => {
      exitTournament();
      history.push(Page.Tournaments + history.location.search);
    }
  });
  const userId = me?._id || '';

  return (
    <Popconfirm
      title="Leave the tournament?"
      onConfirm={(): void => {
        void leaveTournament({
          variables: {
            tournamentId,
            userId
          }
        });
      }}
    >
      <Button loading={loading} type="default" size={'small'}>
        <div style={{ color: 'red', width: '40px' }}>
          {loading ? '' : 'Leave'}
        </div>
      </Button>
    </Popconfirm>
  );
};

export default LeaveTournamentButton;
