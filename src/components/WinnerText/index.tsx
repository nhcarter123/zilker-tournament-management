import React from 'react';

import { Box, Typography } from '@mui/material';
import { useStyles } from 'components/WinnerText/styles';

import { ReactComponent as CrownIcon } from 'image/crown.svg';
import { Variant } from '@mui/material/styles/createTypography';

interface MatchResultSelectProps {
  won: boolean;
  name: string;
  variant: Variant;
  rating?: number;
}

const WinnerText = ({
  won,
  name,
  variant,
  rating
}: MatchResultSelectProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Box>
      <Box className={won ? classes.root : ''}>
        <div className={classes.crownContainer}>
          <CrownIcon className={won ? classes.crown : classes.crownHidden} />
          <Typography variant={variant}>{name}</Typography>
        </div>
      </Box>
      {rating && rating > 0 ? (
        <Typography
          fontFamily={'Monospace'}
          variant={'body1'}
          fontSize={'12px'}
          color={'gray'}
        >
          {rating}
        </Typography>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default WinnerText;
