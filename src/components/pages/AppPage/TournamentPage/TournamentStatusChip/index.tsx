import React from 'react';
import { Chip } from '@mui/material';
import { TournamentStatus } from 'types/types';

interface TournamentStatusChipProps {
  status: TournamentStatus;
}

const TournamentStatusChip = ({
  status
}: TournamentStatusChipProps): JSX.Element => {
  return (
    <Chip
      size={'small'}
      sx={{
        background: '#8c48ff',
        color: 'white',
        marginLeft: '8px'
      }}
      label={`${status === TournamentStatus.Active ? 'Playing' : 'Played'}`}
    />
  );
};

export default TournamentStatusChip;
