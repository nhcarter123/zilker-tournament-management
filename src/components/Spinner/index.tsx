import React from 'react';
import { CircularProgress } from '@mui/material';
import { useStyles } from 'components/Spinner/styles';

const Spinner = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div />
      <CircularProgress size={120} color={'inherit'} />
      <div />
    </div>
  );
};

export default Spinner;
