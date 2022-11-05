import React from 'react';
import 'App.css';
import 'antd/dist/antd.css';

import LoginRouter from 'components/LoginRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const App = (): JSX.Element => {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();

  return (
    <Router>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY || ''}
      >
        <LoginRouter />
      </GoogleReCaptchaProvider>
    </Router>
  );
};

export default App;
