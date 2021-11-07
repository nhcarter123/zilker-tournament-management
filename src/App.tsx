import React from 'react';
import 'App.css';
import 'antd/dist/antd.css';

import PageLayout from 'components/PageLayout';
import { BrowserRouter as Router } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <Router>
      <PageLayout />
    </Router>
  );
};

export default App;
