import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';
import { Box } from '@mui/material/';
interface AddTournamentButtonProps {
  tournamentId: string;
}

const ViewTournamentButton = ({
  tournamentId
}: AddTournamentButtonProps): JSX.Element => {
  const history = useHistory();

  return (
    <Box ml={1}>
      <Button
        size={'large'}
        type="primary"
        onClick={(): void =>
          history.push(
            Page.ViewTournament.replace(':tournamentId', tournamentId)
          )
        }
      >
        View
      </Button>
    </Box>
  );
};

export default ViewTournamentButton;
