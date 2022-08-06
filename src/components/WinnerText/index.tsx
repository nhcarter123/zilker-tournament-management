import React from 'react';

import { Box, Typography } from '@mui/material';
import { useStyles } from 'components/WinnerText/styles';

import { ReactComponent as CrownIcon } from 'svg/crown.svg';
import { Variant } from '@mui/material/styles/createTypography';

interface MatchResultSelectProps {
  won: boolean;
  name: string;
  variant: Variant;
}

const WinnerText = ({
  won,
  name,
  variant
}: MatchResultSelectProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={won ? classes.root : ''}>
      <div className={classes.crownContainer}>
        <CrownIcon className={won ? classes.crown : classes.crownHidden} />
        <Typography variant={variant}>{name}</Typography>
      </div>
    </Box>
  );
};

export default WinnerText;
