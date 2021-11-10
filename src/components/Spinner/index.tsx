import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { useStyles } from 'components/Spinner/styles';

const CodeInput = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress size={120} color={'inherit'} />
    </Box>
  );
};

export default CodeInput;
