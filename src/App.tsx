import React from 'react';
import 'App.css';
import 'antd/dist/antd.css';

import LoginRouter from 'components/LoginRouter';
import { BrowserRouter as Router } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <Router>
      <LoginRouter />
    </Router>
  );
};

export default App;
