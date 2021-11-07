import React from 'react';
import { makeStyles } from '@material-ui/core';

// todo move to other folder
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    height: '42px',
    marginBottom: '2px'
  }
});

type ContentHeaderProps = {
  title: string;
};

const ContentHeader = (props: ContentHeaderProps): JSX.Element => {
  const classes = useStyles();

  return <div className={classes.root}>{props.title}</div>;
};

export default ContentHeader;
