import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import LoginPage from 'components/pages/general/LoginPage';
import MoreInfoPage from 'components/pages/general/MoreInfoPage';

import { Pages } from 'types/pages';
import { useStyles } from 'components/PageLayout/styles';

const PageLayout = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Redirect from={'/'} exact to={Pages.login} />
        <Route path={Pages.login} component={LoginPage} />
        <Route path={Pages.moreInfo} component={MoreInfoPage} />
        <Route path={Pages.readyUp} component={LoginPage} />
      </div>
    </div>
  );
};

export default PageLayout;
