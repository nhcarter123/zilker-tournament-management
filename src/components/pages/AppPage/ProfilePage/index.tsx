import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material/';
import { UserContext } from 'context/userContext';
import Bold from 'components/Bold';
import PictureEditor from 'components/PictureEditor';
import OrganizationEditor from 'components/OrganizationEditor';

const ProfilePage = (): JSX.Element => {
  const me = useContext(UserContext);

  return me ? (
    <Box position={'relative'} height={'100%'}>
      <Box
        py={2}
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
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default ProfilePage;
