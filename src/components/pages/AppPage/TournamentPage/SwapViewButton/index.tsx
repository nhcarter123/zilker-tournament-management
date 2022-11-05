import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';
import { Box } from '@mui/material/';

interface SwapViewButtonProps {
  tournamentId: string;
  isTournamentPage: boolean;
}

const SwapViewButton = ({
  tournamentId,
  isTournamentPage
}: SwapViewButtonProps): JSX.Element => {
  const history = useHistory();

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Button
        type="primary"
        size={'small'}
        style={{ width: 'fit-content' }}
        onClick={() => {
          const target = isTournamentPage
            ? Page.Tournament.replace(':tournamentId', tournamentId)
            : Page.ViewTournament.replace(':tournamentId', tournamentId);

          history.push(target + history.location.search);
        }}
      >
        <div>{isTournamentPage ? 'View match' : 'View Tournament'}</div>
      </Button>
    </Box>
  );
};

export default SwapViewButton;
