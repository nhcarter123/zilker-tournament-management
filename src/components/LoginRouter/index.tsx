import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import LoginPage from 'components/pages/login/LoginPage';
import MoreInfoPage from 'components/pages/login/MoreInfoPage';
import AppPage from 'components/pages/login/AppPage';
import Spinner from 'components/Spinner';

import { GET_ME } from 'graphql/queries/queries';
import { Pages } from 'types/pages';
import { User } from 'types/types';
import { UPDATE_USER_DETAILS, VERIFY_CODE } from 'graphql/mutations/mutations';
import { onError } from 'graphql/errorHandler';

import { useStyles } from 'components/LoginRouter/styles';

const PageLayout = (): JSX.Element => {
  const history = useHistory();
  const classes = useStyles();

  const {
    data,
    loading: meLoading,
    refetch
  } = useQuery<{ me: Nullable<User> }>(GET_ME, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      if (history.location.pathname !== Pages.login && !data?.me) {
        return history.push(Pages.login);
      }

      if (
        (history.location.pathname === Pages.login ||
          history.location.pathname === Pages.moreInfo) &&
        data?.me?.firstName
      ) {
        return history.push(Pages.app);
      }

      if (data?.me && !data?.me.firstName) {
        return history.push(Pages.moreInfo);
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

  const [updateUserDetails] = useMutation(UPDATE_USER_DETAILS, {
    onError,
    onCompleted: refetch
  });

  const me = data?.me;

  return (
    <div className={classes.root}>
      {meLoading || verifyCodeLoading || !me ? (
        <Spinner />
      ) : (
        <>
          <Route
            path={Pages.login}
            render={(): JSX.Element => <LoginPage verifyCode={verifyCode} />}
          />
          <Route
            path={Pages.moreInfo}
            render={(): JSX.Element => (
              <MoreInfoPage updateUserDetails={updateUserDetails} />
            )}
          />
          <Route
            path={Pages.app}
            render={(): JSX.Element => <AppPage me={me} />}
          />
        </>
      )}
    </div>
  );
};

export default PageLayout;
