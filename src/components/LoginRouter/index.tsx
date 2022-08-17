import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { NetworkStatus, useMutation, useQuery } from '@apollo/client';

import LoginPage from 'components/pages/LoginPage';
import MoreInfoPage from 'components/pages/MoreInfoPage';
import AppPage from 'components/pages/AppPage';
import Spinner from 'components/Spinner';

import { GET_ME } from 'graphql/definitions/queries';
import { Page } from 'types/page';
import { User } from 'types/types';
import {
  UPDATE_USER_DETAILS,
  VERIFY_CODE
} from 'graphql/definitions/mutations';
import { onError } from 'graphql/errorHandler';

import { useStyles } from 'components/LoginRouter/styles';
import { UserContext } from 'context/userContext';
import { Redirect } from 'react-router';

const LoginRouter = (): JSX.Element => {
  const history = useHistory();
  const classes = useStyles();

  const token = localStorage.getItem('token');

  const {
    data,
    loading: meLoading,
    networkStatus,
    refetch
  } = useQuery<{ me: Nullable<User> }>(GET_ME, {
    fetchPolicy: 'no-cache', // todo test
    notifyOnNetworkStatusChange: true,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    },
    onCompleted: () => {
      if (
        (history.location.pathname === '/' ||
          history.location.pathname === Page.Login ||
          history.location.pathname === Page.MoreInfo) &&
        data?.me?.firstName
      ) {
        return history.push(Page.Tournaments + history.location.search);
      }

      if (data?.me && !data?.me.firstName) {
        return history.push(Page.MoreInfo + history.location.search);
      }
    }
  });

  const [verifyCode, { loading: verifyCodeLoading }] = useMutation(
    VERIFY_CODE,
    {
      onError,
      onCompleted: (data) => {
        localStorage.setItem('token', data.verifyCode.token);
        void refetch();
      }
    }
  );

  const [updateUserDetails, { loading: updateUserDetailsLoading }] =
    useMutation(UPDATE_USER_DETAILS, {
      onError,
      onCompleted: refetch
    });

  const me = data?.me || null;

  return (
    <div className={classes.root}>
      {(meLoading &&
        (!me?.firstName || networkStatus !== NetworkStatus.refetch)) ||
      verifyCodeLoading ? (
        <Spinner />
      ) : (
        <UserContext.Provider value={me}>
          <Route exact path="/">
            <Redirect to={Page.Tournaments} />
          </Route>
          {/*Legacy Support*/}
          <Route path="/app">
            <Redirect to={Page.Tournaments} />
          </Route>
          <Route
            path={Page.Login}
            render={(): JSX.Element => <LoginPage verifyCode={verifyCode} />}
          />
          <Route
            path={Page.MoreInfo}
            render={(): JSX.Element => (
              <MoreInfoPage
                updateUserDetails={updateUserDetails}
                updateUserDetailsLoading={updateUserDetailsLoading}
              />
            )}
          />
          <Route
            path={[
              Page.Profile,
              Page.Community,
              Page.Rules,
              Page.Donate,
              Page.Stats,
              Page.About,
              '/tournament',
              Page.Tournaments
            ]}
            component={AppPage}
          />
        </UserContext.Provider>
      )}
    </div>
  );
};

export default LoginRouter;
