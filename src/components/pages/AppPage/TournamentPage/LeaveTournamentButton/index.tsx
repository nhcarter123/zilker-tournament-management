import React, { useContext } from 'react';
import { Box } from '@mui/material/';
import { Button, Popconfirm } from 'antd';
import { UserContext } from 'context/userContext';
import { useMutation } from '@apollo/client';
import { KICK_PLAYER } from 'graphql/mutations/mutations';
import { onError } from 'graphql/errorHandler';
import { Page } from '../../../../../types/page';
import { useHistory } from 'react-router-dom';
import { MyTournamentContext } from 'context/myTournamentContext';

interface CompletedPageProps {
  tournamentId: string;
}

const LeaveTournamentButton = ({
  tournamentId
}: CompletedPageProps): JSX.Element => {
  const history = useHistory();
  const { setMyTournamentId } = useContext(MyTournamentContext);
  const me = useContext(UserContext);
  const [leaveTournament, { loading }] = useMutation(KICK_PLAYER, {
    onError,
    onCompleted: () => {
      setMyTournamentId(null);
      history.push(Page.Tournaments);
    }
  });
  const userId = me?._id || '';

  return (
    <Box sx={{ position: 'absolute', right: '28px', top: '92px' }}>
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
        <Button loading={loading} type="default" size={'middle'}>
          <div style={{ color: 'red', width: '40px' }}>
            {loading ? '' : 'Leave'}
          </div>
        </Button>
      </Popconfirm>
    </Box>
  );
};

export default LeaveTournamentButton;
