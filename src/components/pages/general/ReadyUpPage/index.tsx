import React from 'react';
import { Typography } from '@material-ui/core';
import { User } from 'types/user';

interface ReadyUpPageProps {
  me: Nullable<User>;
}

const ReadyUpPage = ({ me }: ReadyUpPageProps): JSX.Element => {
  return (
    <div>
      <div>{me?.firstName}</div>
      <div>{me?.lastName}</div>
      <div>{me?.rating}</div>
      <Typography variant={'h4'}>Get Ready</Typography>
    </div>
  );
};

export default ReadyUpPage;
