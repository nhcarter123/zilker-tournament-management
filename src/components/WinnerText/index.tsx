import React from 'react';

import { Box, Typography } from '@mui/material';
import { useStyles } from 'components/WinnerText/styles';

import { ReactComponent as CrownIcon } from 'svg/crown.svg';

interface MatchResultSelectProps {
  won: boolean;
  name: string;
}

const WinnerText = ({ won, name }: MatchResultSelectProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={won ? classes.root : ''}>
      <div className={classes.crownContainer}>
        <CrownIcon className={won ? classes.crown : classes.crownHidden} />
        <Typography>{name}</Typography>
      </div>
    </Box>
  );
};

export default WinnerText;
