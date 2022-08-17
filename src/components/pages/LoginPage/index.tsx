import React, { useState } from 'react';

import SendCodeForm from 'components/forms/SendCodeForm';
import CodeInput from 'components/CodeInput';

import { Typography, Box } from '@mui/material';
import { Button } from 'antd';

export enum EVerificationMethod {
  Phone = 'Phone',
  Email = 'Email'
}

interface LoginPageProps {
  verifyCode: Function;
  loginEmail: Function;
  loginPhone: Function;
  tooManyCodesError: boolean;
  loading: boolean;
}

const LoginPage = ({
  verifyCode,
  loginEmail,
  loginPhone,
  tooManyCodesError,
  loading
}: LoginPageProps): JSX.Element => {
  const [hasSentCode, setHasSentCode] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState(
    EVerificationMethod.Email
  );

  return (
    <>
      {tooManyCodesError ? (
        <>
          <Typography variant={'h5'}>⚠️ Rate limit exceeded ⚠️</Typography>
          <Box display={'flex'} justifyContent={'center'}>
            <Typography variant={'body2'}>Come back later️</Typography>
          </Box>
        </>
      ) : (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          height={'100%'}
          sx={{ flexDirection: 'column' }}
        >
          <div />

          <div>
            <Box display={'flex'}>
              <Box mr={1}>
                <Typography variant={'h4'} align={'center'}>
                  Welcome
                </Typography>
                <Typography
                  variant={'body2'}
                  align={'center'}
                  sx={{
                    marginBottom: '-12px',
                    marginTop: '-4px',
                    color: 'gray'
                  }}
                >
                  New or existing user
                </Typography>
              </Box>

              <Typography variant={'h4'} align={'center'}>
                👋
              </Typography>
            </Box>

            <SendCodeForm
              verificationMethod={verificationMethod}
              hasSentCode={hasSentCode}
              setHasSentCode={setHasSentCode}
              loginEmail={loginEmail}
              loginPhone={loginPhone}
              loading={loading}
            />
            {hasSentCode && !loading && <CodeInput verifyCode={verifyCode} />}
          </div>

          <Box
            mb={2}
            display={'flex'}
            justifyContent={'center'}
            flexDirection="column"
          >
            <Button
              type={'link'}
              disabled
              onClick={() =>
                setVerificationMethod(
                  verificationMethod === EVerificationMethod.Phone
                    ? EVerificationMethod.Email
                    : EVerificationMethod.Phone
                )
              }
            >
              Sign in with
              {verificationMethod === EVerificationMethod.Phone
                ? ' email'
                : ' phone number'}
            </Button>
            <Typography variant={'body2'} sx={{ color: 'gray' }}>
              Phone sign-in is experiencing a temporary outage
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LoginPage;
