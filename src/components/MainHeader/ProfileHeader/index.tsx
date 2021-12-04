import React from 'react';
import { Typography } from '@mui/material';

const ProfileHeader = (): JSX.Element => {
  return (
    <Typography variant={'h4'} sx={{ lineHeight: 1.5 }} ml={0.5}>
      Profile
    </Typography>
  );
};

export default ProfileHeader;
