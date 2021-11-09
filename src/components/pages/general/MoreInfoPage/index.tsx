import React from 'react';
import ContentHeader from 'components/ContentHeader';

import MoreInfoForm from 'components/forms/MoreInfoForm';

const LoginPage = (): JSX.Element => {
  return (
    <div>
      <ContentHeader title={'Addition Info'} />
      <MoreInfoForm />
    </div>
  );
};

export default LoginPage;
