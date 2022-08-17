import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import { SEND_VERIFICATION_CODE } from 'graphql/definitions/mutations';

import SendCodeForm from 'components/forms/SendCodeForm';
import CodeInput from 'components/CodeInput';

import { Typography, Box } from '@mui/material';

interface LoginPageProps {
  verifyCode: Function;
}

const LoginPage = ({ verifyCode }: LoginPageProps): JSX.Element => {
  const [hasSentCode, setHasSentCode] = useState(false);
  const [tooManyCodesError, setTooManyCodesError] = useState(false);

  const [sendVerificationCode, { loading: verificationCodeLoading }] =
    useMutation(SEND_VERIFICATION_CODE, {
      onError: (error) => {
        setTooManyCodesError(error.message.includes('Rate limit exceeded'));
        onError(error);
      }
    });

  return (
    <div>
      {tooManyCodesError ? (
        <>
          <Typography variant={'h5'}>⚠️ Rate limit exceeded ⚠️</Typography>
          <Box display={'flex'} justifyContent={'center'}>
            <Typography variant={'body2'}>Come back later️</Typography>
          </Box>
        </>
      ) : (
        <div>
          <Typography variant={'h4'} align={'center'}>
            Welcome 👋
          </Typography>
          <Typography
            variant={'body2'}
            align={'center'}
            sx={{ marginBottom: '-12px', color: 'gray' }}
          >
            New or existing user sign in
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
      )}
    </div>
  );
};

export default LoginPage;
