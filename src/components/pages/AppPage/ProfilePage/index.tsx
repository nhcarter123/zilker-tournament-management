import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material/';
import PlayerAvatar from 'components/PlayerAvatar';
import { UserContext } from '../../../../context/userContext';
import Bold from '../../../Bold';

const ProfilePage = (): JSX.Element => {
  const me = useContext(UserContext);

  return me ? (
    <Box mt={3}>
      <PlayerAvatar player={me} large />

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
