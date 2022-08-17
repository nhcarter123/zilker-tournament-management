import React from 'react';
import { LinearProgress, Box } from '@mui/material';
import { Spin } from 'antd';
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
        <Spin size="large" />
      </Box>
      <div />
    </div>
  );
};

export default Spinner;
