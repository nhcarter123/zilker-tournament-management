import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material/';
import PlayerAvatar from 'components/PlayerAvatar';
import { UserContext } from '../../../../context/userContext';

const ProfilePage = (): JSX.Element => {
  const me = useContext(UserContext);

  return me ? (
    <Box mt={5.5}>
      <Typography variant={'h5'} align={'center'} mb={2}>
        Profile
      </Typography>

      <PlayerAvatar player={me} />

      <Box mt={2} mb={1}>
        <Typography
          align={'center'}
          variant={'body1'}
        >{`${me.firstName} ${me.lastName}`}</Typography>
        <Typography align={'center'} variant={'body1'}>
          {`Rating: ${me.rating}`}
        </Typography>
      </Box>

      <Typography variant={'h5'} align={'center'} mt={3}>
        Tournament History
      </Typography>
      <Typography variant={'body1'} align={'center'} mt={2}>
        TODO
      </Typography>
    </Box>
  ) : (
    <></>
  );
};

export default ProfilePage;
