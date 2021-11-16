import React from 'react';
import { CircularProgress, LinearProgress, Box } from '@mui/material';
import { useStyles } from 'components/Spinner/styles';

interface SpinnerProps {
  linear?: boolean;
}

const Spinner = ({ linear }: SpinnerProps): JSX.Element => {
  const classes = useStyles();

  return linear ? (
    <Box sx={{ width: '100%' }} className={classes.linear}>
      <LinearProgress color={'inherit'} />
    </Box>
  ) : (
    <div className={classes.spinner}>
      <div />
      <Box display={'flex'} alignItems={'center'}>
        <CircularProgress size={120} color={'inherit'} />
      </Box>
      <div />
    </div>
  );
};

export default Spinner;
