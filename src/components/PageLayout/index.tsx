import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';

import { Pages } from 'types/pages';
import { useStyles } from 'components/PageLayout/styles';

const PageLayout = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.itemContainer}>Are you a...</div>
        <div className={classes.itemContainer}>
          <Button type="primary" className={classes.button}>
            Returning Player
          </Button>
        </div>
        <div className={classes.itemContainer}>
          <Button type="primary" className={classes.button}>
            New Player
          </Button>
        </div>
        <Redirect from={'/'} exact to={Pages.players} />
      </div>
    </div>
  );
};

export default PageLayout;
