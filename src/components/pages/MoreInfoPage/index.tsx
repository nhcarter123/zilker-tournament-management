import React from 'react';

import GetMoreDetailsForm from 'components/forms/GetMoreDetailsForm';
import { Typography } from '@mui/material/';

interface MoreInfoPageProps {
  updateUserDetails: Function;
  updateUserDetailsLoading: boolean;
}

const MoreInfoPage = ({
  updateUserDetails,
  updateUserDetailsLoading
}: MoreInfoPageProps): JSX.Element => {
  return (
    <div>
      <Typography variant={'h4'} align={'center'}>
        Tell us more
      </Typography>
      <GetMoreDetailsForm
        updateUserDetails={updateUserDetails}
        updateUserDetailsLoading={updateUserDetailsLoading}
      />
    </div>
  );
};

export default MoreInfoPage;
