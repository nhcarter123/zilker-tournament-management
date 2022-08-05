import React from 'react';
import { Chip } from '@mui/material';

interface TournamentStatusChipProps {
  label: string;
  background?: string;
}

const TournamentStatusChip = ({
  label,
  background = '#8c48ff'
}: TournamentStatusChipProps): JSX.Element => {
  return (
    <Chip
      size={'small'}
      sx={{
        background,
        color: 'white',
        marginLeft: '8px'
      }}
      label={label}
    />
  );
};

export default TournamentStatusChip;
