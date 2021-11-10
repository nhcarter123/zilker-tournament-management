import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import LoginPage from 'components/pages/general/LoginPage';
import MoreInfoPage from 'components/pages/general/MoreInfoPage';
import ReadyUpPage from 'components/pages/general/ReadyUpPage';
import Spinner from 'components/Spinner';

import { onError } from 'graphql/errorHandler';
import { GET_ME } from 'graphql/queries/queries';
import { UPDATE_USER_DETAILS, VERIFY_CODE } from 'graphql/mutations/mutations';

import { useStyles } from 'components/PageLayout/styles';
import { Pages } from 'types/pages';
import { User } from 'types/user';

const PageLayout = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const { data, loading: meLoading } = useQuery<{ me: Nullable<User> }>(
    GET_ME,
    {
      onCompleted: (data) => {
        if (data.me?.firstName) {
          history.push(Pages.readyUp);
        } else if (data.me?.phone) {
          history.push(Pages.moreInfo);
        }
      }
    }
  );

  const [verifyCode, { loading: verifyCodeLoading }] = useMutation(
    VERIFY_CODE,
    {
      onError,
      onCompleted: (data) => {
        localStorage.setItem('token', data.verifyCode.token);
      }
    }
  );

  const [updateUserDetails, { loading: updateUserDetailsLoading }] =
    useMutation(UPDATE_USER_DETAILS, {
      onError
    });

  const loading = updateUserDetailsLoading || verifyCodeLoading || meLoading;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {loading ? (
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
              path={Pages.readyUp}
              render={(): JSX.Element => <ReadyUpPage me={data?.me || null} />}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
