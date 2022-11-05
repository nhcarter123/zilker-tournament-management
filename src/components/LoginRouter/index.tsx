import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { NetworkStatus, useMutation, useQuery } from '@apollo/client';

import LoginPage from 'components/pages/LoginPage';
import MoreInfoPage from 'components/pages/MoreInfoPage';
import AppPage from 'components/pages/AppPage';
import Spinner from 'components/Spinner';

import { GET_ME } from 'graphql/definitions/queries';
import { Page } from 'types/page';
import { User } from 'types/types';
import { UPDATE_USER_DETAILS } from 'graphql/definitions/mutations';
import { onError } from 'graphql/errorHandler';

import { UserContext } from 'context/userContext';
import { LoginContext } from 'context/loginContext';
import { Redirect } from 'react-router';
import { Box } from '@mui/material';

const LoginRouter = (): JSX.Element => {
  const history = useHistory();

  const queryParams = new URLSearchParams(window.location.search);

  const [token, setToken] = useState(localStorage.getItem('token'));

  const {
    data,
    loading: meLoading,
    networkStatus,
    refetch: refetchGetMe
  } = useQuery<{ me: Nullable<User> }>(GET_ME, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        authorization: (token?.length || 0) > 0 ? `Bearer ${token}` : ''
      }
    },
    onCompleted: () => {
      if (
        (history.location.pathname === '/' ||
          history.location.pathname === Page.Login ||
          history.location.pathname === Page.MoreInfo) &&
        data?.me?.firstName
      ) {
        const page = queryParams.get('page');

        if (page) {
          queryParams.delete('page');
          history.replace({
            search: queryParams.toString()
          });
          return history.push(page + history.location.search);
        }

        return history.push(Page.Home + history.location.search);
      }

      if (data?.me && !data?.me.firstName) {
        return history.push(Page.MoreInfo + history.location.search);
      }
    }
  });

  const [updateUserDetails, { loading: updateUserDetailsLoading }] =
    useMutation(UPDATE_USER_DETAILS, {
      onError,
      refetchQueries: [GET_ME]
    });

  const me = data?.me || null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'var(--app-height)'
      }}
    >
      {meLoading &&
      (!me?.firstName || networkStatus !== NetworkStatus.refetch) ? (
        <Spinner />
      ) : (
        <UserContext.Provider value={me}>
          <LoginContext.Provider value={{ setToken, refetchGetMe }}>
            {/*Legacy Support*/}
            <Route path="/tournament">
              <Redirect to={Page.Tournaments} />
            </Route>
            <Route path="/community">
              <Redirect to={Page.Community} />
            </Route>
            <Route path="/rules">
              <Redirect to={Page.Home} />
            </Route>
            <Route path="/stats">
              <Redirect to={Page.Stats} />
            </Route>
            <Route path="/donate">
              <Redirect to={Page.Donate} />
            </Route>
            <Route path="/about">
              <Redirect to={Page.About} />
            </Route>
            {/*Legacy Support*/}

            <Route exact path="/">
              <Redirect to={Page.Tournaments} />
            </Route>
            <Route
              path={Page.Login}
              render={(): JSX.Element => <LoginPage setToken={setToken} />}
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
                Page.Home,
                Page.Tournaments,
                Page.Tournament,
                Page.Challenge,
                Page.Profile
              ]}
              component={AppPage}
            />
          </LoginContext.Provider>
        </UserContext.Provider>
      )}
    </Box>
  );
};

export default LoginRouter;
