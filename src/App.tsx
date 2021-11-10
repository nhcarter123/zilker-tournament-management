import React from 'react';
import 'App.css';
import 'antd/dist/antd.css';

import PageLayout from 'components/PageLayout';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Pages } from 'types/pages';

const App = (): JSX.Element => {
  return (
    <Router>
      <Redirect from={'/'} exact to={Pages.login} />
      <PageLayout />
    </Router>
  );
};

export default App;
