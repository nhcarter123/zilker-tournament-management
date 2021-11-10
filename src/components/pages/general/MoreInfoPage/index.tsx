import React from 'react';

import GetMoreDetailsForm from 'components/forms/GetMoreDetailsForm';
import { Typography } from '@material-ui/core';

interface MoreInfoPageProps {
  updateUserDetails: Function;
}

const MoreInfoPage = ({
  updateUserDetails
}: MoreInfoPageProps): JSX.Element => {
  return (
    <div>
      <Typography variant={'h4'} align={'center'}>
        Tell us more
      </Typography>
      <GetMoreDetailsForm updateUserDetails={updateUserDetails} />
    </div>
  );
};

export default MoreInfoPage;
