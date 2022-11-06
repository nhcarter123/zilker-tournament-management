import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material/';
import { UserContext } from 'context/userContext';
import Bold from 'components/Bold';
import PictureEditor from 'components/PictureEditor';
import OrganizationEditor from 'components/OrganizationEditor';
import { useMutation } from '@apollo/client';
import { LOGOUT } from 'graphql/definitions/mutations';
import { User } from 'types/types';
import { Button } from 'antd';
import { LoginContext } from 'context/loginContext';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';
import { GET_ME } from 'graphql/definitions/queries';
import { THEME_PRIMARY } from 'constants/constants';
import { Redirect } from 'react-router';

const ProfilePage = (): JSX.Element => {
  const me = useContext(UserContext);
  const { setToken } = useContext(LoginContext);
  const history = useHistory();

  const [logout, { loading }] = useMutation<{
    logout: Nullable<User>;
  }>(LOGOUT, {
    refetchQueries: [GET_ME],
    awaitRefetchQueries: true,
    onCompleted: () => {
      localStorage.setItem('token', '');
      setToken(null);
      history.push(Page.Login);
    }
  });

  return me ? (
    <Box position={'relative'} height={'100%'}>
      <Box
        pt={4}
        pb={2}
        sx={{
          overflow: 'auto',
          borderColor: '#e5e5e5',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
        px={1}
      >
        <PictureEditor />

        <Box mt={2} mb={1}>
          <Typography align={'center'} variant={'body1'} component={'span'}>
            <Bold>{`${me.firstName} ${me.lastName}`}</Bold>
          </Typography>
          <Typography align={'center'} variant={'body1'}>
            {`Rating: ${me.rating}`}
          </Typography>{' '}
          <Typography align={'center'} variant={'body1'}>
            {`Matches played: ${me.matchesPlayed}`}
          </Typography>
        </Box>

        <OrganizationEditor />

        {/*<Typography variant={'h5'} align={'center'} mt={3}>*/}
        {/*  Tournament History*/}
        {/*</Typography>*/}
        {/*<Typography variant={'body1'} align={'center'} mt={2}>*/}
        {/*  TODO*/}
        {/*</Typography>*/}

        <Box mt={2}>
          <Button
            style={{
              background: THEME_PRIMARY,
              borderColor: THEME_PRIMARY
            }}
            size={'middle'}
            type="primary"
            loading={loading}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  ) : (
    <Redirect to={Page.Home} />
  );
};

export default ProfilePage;
