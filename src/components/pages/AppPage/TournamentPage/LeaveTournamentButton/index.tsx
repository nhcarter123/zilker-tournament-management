import React, { useContext } from 'react';
import { Box } from '@mui/material/';
import { Button, Popconfirm } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { UserContext } from '../../../../../context/userContext';
import { useMutation } from '@apollo/client';
import { KICK_PLAYER } from '../../../../../graphql/mutations/mutations';
import { GET_TOURNAMENT } from '../../../../../graphql/queries/queries';
import { onError } from '../../../../../graphql/errorHandler';

interface CompletedPageProps {
  tournamentId: string;
}

const LeaveTournamentButton = ({
  tournamentId
}: CompletedPageProps): JSX.Element => {
  const me = useContext(UserContext);
  const [leaveTournament, { loading }] = useMutation(KICK_PLAYER, {
    refetchQueries: [GET_TOURNAMENT],
    onError
  });
  const userId = me?._id || '';

  return (
    <Box
      sx={{
        position: 'absolute',
        right: '28px',
        top: '100px'
      }}
    >
      <Popconfirm
        title="Leave the tournament?"
        onConfirm={(): void =>
          void leaveTournament({
            variables: {
              tournamentId,
              userId
            }
          })
        }
      >
        <Button
          loading={loading}
          type="default"
          shape="circle"
          icon={<LogoutOutlined style={{ color: 'red' }} />}
        />
      </Popconfirm>
    </Box>
  );
};

export default LeaveTournamentButton;
