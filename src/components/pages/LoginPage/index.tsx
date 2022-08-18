import React, { useState } from 'react';

import SendCodeForm from 'components/forms/SendCodeForm';
import CodeInput from 'components/CodeInput';

import { Typography, Box } from '@mui/material';
import { Button, Radio } from 'antd';

export enum EVerificationMethod {
  Phone = 'Phone',
  Email = 'Email'
}

const signInOptions = [
  { label: 'Register', value: true },
  { label: 'Login', value: false }
];

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
    EVerificationMethod.Phone
  );
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

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
            <Box display={'flex'} justifyContent={'center'} mb={2}>
              <Box mr={1}>
                <Typography variant={'h4'} align={'center'}>
                  Welcome
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
              isNewUser={isNewUser}
            />
            {hasSentCode && !loading && <CodeInput verifyCode={verifyCode} />}

            {verificationMethod === EVerificationMethod.Email && (
              <Box mt={2} display={'flex'} justifyContent={'center'}>
                <Box>
                  <Radio.Group
                    style={{ width: '100%' }}
                    // className={classes.root}
                    onChange={(e) => setIsNewUser(e.target.value)}
                    options={signInOptions}
                    value={isNewUser}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </Box>
              </Box>
            )}
          </div>

          <Box
            mb={2}
            display={'flex'}
            justifyContent={'center'}
            flexDirection="column"
          >
            <Button
              type={'link'}
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
          </Box>
        </Box>
      )}
    </>
  );
};

export default LoginPage;
