import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';

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
    <Button
      type="primary"
      size={'small'}
      onClick={() => {
        const target = isTournamentPage
          ? Page.Tournament.replace(':tournamentId', tournamentId)
          : Page.ViewTournament.replace(':tournamentId', tournamentId);

        history.push(target + history.location.search);
      }}
    >
      <div>{isTournamentPage ? 'View match' : 'View Tournament'}</div>
    </Button>
  );
};

export default SwapViewButton;
