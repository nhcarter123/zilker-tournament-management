import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { NetworkStatus, useMutation, useQuery } from '@apollo/client';

import LoginPage from 'components/pages/LoginPage';
import MoreInfoPage from 'components/pages/MoreInfoPage';
import AppPage from 'components/pages/AppPage';
import Spinner from 'components/Spinner';

import { GET_ME } from 'graphql/queries/queries';
import { Page } from 'types/page';
import { User } from 'types/types';
import { UPDATE_USER_DETAILS, VERIFY_CODE } from 'graphql/mutations/mutations';
import { onError } from 'graphql/errorHandler';

import { useStyles } from 'components/LoginRouter/styles';
import { UserContext } from 'context/userContext';

const LoginRouter = (): JSX.Element => {
  const history = useHistory();
  const classes = useStyles();

  const {
    data,
    loading: meLoading,
    networkStatus,
    refetch
  } = useQuery<{ me: Nullable<User> }>(GET_ME, {
    // fetchPolicy: 'network-only',
    // pollInterval: 5000,
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      if (history.location.pathname !== Page.Login && !data?.me) {
        return history.push(Page.Login);
      }

      if (
        (history.location.pathname === '/' ||
          history.location.pathname === Page.Login ||
          history.location.pathname === Page.MoreInfo) &&
        data?.me?.firstName
      ) {
        return history.push(Page.Tournament.replace(':tournamentId', 'find'));
      }

      if (data?.me && !data?.me.firstName) {
        return history.push(Page.MoreInfo);
      }
    }
  });

  const [verifyCode, { loading: verifyCodeLoading }] = useMutation(
    VERIFY_CODE,
    {
      onError,
      onCompleted: (data) => {
        localStorage.setItem('token', data.verifyCode.token);
        refetch();
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
      {(meLoading && networkStatus !== NetworkStatus.refetch) ||
      verifyCodeLoading ? (
        <Spinner />
      ) : (
        <UserContext.Provider value={me}>
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
          <Route path={Page.App} component={AppPage} />
        </UserContext.Provider>
      )}
    </div>
  );
};

export default LoginRouter;
