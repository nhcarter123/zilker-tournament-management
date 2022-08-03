import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { SEND_VERIFICATION_CODE } from 'graphql/definitions/mutations';

import SendCodeForm from 'components/forms/SendCodeForm';
import CodeInput from 'components/CodeInput';

import { Typography } from '@mui/material';

interface LoginPageProps {
  verifyCode: Function;
}

const LoginPage = ({ verifyCode }: LoginPageProps): JSX.Element => {
  const [hasSentCode, setHasSentCode] = useState(false);

  const [sendVerificationCode, { loading: verificationCodeLoading }] =
    useMutation(SEND_VERIFICATION_CODE, { onError });

  return (
    <div>
      <Typography variant={'h4'} align={'center'}>
        Welcome
      </Typography>
      <SendCodeForm
        hasSentCode={hasSentCode}
        setHasSentCode={setHasSentCode}
        sendVerificationCode={sendVerificationCode}
        loading={verificationCodeLoading}
      />
      {hasSentCode && !verificationCodeLoading && (
        <CodeInput verifyCode={verifyCode} />
      )}
    </div>
  );
};

export default LoginPage;
