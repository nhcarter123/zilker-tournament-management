import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { Page } from '../../../types/page';
interface AddTournamentButtonProps {
  tournamentId: string;
}

const ViewTournamentButton = ({
  tournamentId
}: AddTournamentButtonProps): JSX.Element => {
  const history = useHistory();

  return (
    <Button
      size={'large'}
      type="primary"
      onClick={(): void =>
        history.push(Page.ViewTournament.replace(':tournamentId', tournamentId))
      }
    >
      View
    </Button>
  );
};

export default ViewTournamentButton;
