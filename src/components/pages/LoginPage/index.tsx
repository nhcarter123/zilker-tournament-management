import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import SendCodeForm from 'components/forms/SendCodeForm';
import CodeInput from 'components/CodeInput';
import Spinner from 'components/Spinner';

import { Typography, Box } from '@mui/material';
import { Button, Radio } from 'antd';
import { useMutation } from '@apollo/client';
import {
  LOGIN_EMAIL,
  VERIFY_CODE,
  VERIFY_EMAIL,
  VERIFY_PHONE
} from 'graphql/definitions/mutations';
import { onError } from 'graphql/errorHandler';

export enum EVerificationMethod {
  Phone = 'Phone',
  Email = 'Email'
}

const signInOptions = [
  { label: 'Register', value: true },
  { label: 'Login', value: false }
];

const setHidden = (hidden: boolean): void => {
  const doc = document.documentElement;
  doc.style.setProperty('--captcha-hidden', hidden ? 'hidden' : 'visible');
};

interface ILoginPageProps {
  setToken: Dispatch<SetStateAction<string | null>>;
}

const LoginPage = ({ setToken }: ILoginPageProps): JSX.Element => {
  const [hasSentCode, setHasSentCode] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState(
    EVerificationMethod.Phone
  );
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  const [verifyPhone, { loading: verifyPhoneLoading }] = useMutation(
    VERIFY_PHONE,
    {
      onError,
      onCompleted: () => {
        setHasSentCode(true);
      }
    }
  );

  const [verifyEmail, { loading: verifyEmailLoading }] = useMutation(
    VERIFY_EMAIL,
    {
      onError,
      onCompleted: () => {
        setHasSentCode(true);
      }
    }
  );

  const [loginEmail, { loading: loginEmailLoading }] = useMutation(
    LOGIN_EMAIL,
    {
      onError,
      onCompleted: (data) => {
        localStorage.setItem('token', data.loginEmail.token);
        setToken(data.loginEmail.token);
      }
    }
  );

  const [verifyCode, { loading: verifyCodeLoading }] = useMutation(
    VERIFY_CODE,
    {
      onError,
      onCompleted: (data) => {
        localStorage.setItem('token', data.verifyCode.token);
        setToken(data.verifyCode.token);
      }
    }
  );

  useEffect(() => {
    setHidden(false);
    return () => setHidden(true);
  }, []);

  return (
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

        {verificationMethod === EVerificationMethod.Email && (
          <Box mb={2} display={'flex'} justifyContent={'center'}>
            <Box>
              <Radio.Group
                style={{ width: '100%' }}
                onChange={(e) => setIsNewUser(e.target.value)}
                options={signInOptions}
                value={isNewUser}
                optionType="button"
                buttonStyle="solid"
              />
            </Box>
          </Box>
        )}

        <SendCodeForm
          verificationMethod={verificationMethod}
          hasSentCode={hasSentCode}
          verifyPhone={verifyPhone}
          verifyEmail={verifyEmail}
          loginEmail={loginEmail}
          loading={
            verifyPhoneLoading || verifyEmailLoading || loginEmailLoading
          }
          isNewUser={isNewUser}
        />
        {hasSentCode &&
          (verifyCodeLoading ? (
            <Spinner />
          ) : (
            <CodeInput verifyCode={verifyCode} />
          ))}
      </div>

      <Box
        mb={2}
        display={'flex'}
        justifyContent={'center'}
        flexDirection="column"
      >
        <Button
          type={'link'}
          onClick={() => {
            setHasSentCode(false);
            setVerificationMethod(
              verificationMethod === EVerificationMethod.Phone
                ? EVerificationMethod.Email
                : EVerificationMethod.Phone
            );
          }}
        >
          Sign in with
          {verificationMethod === EVerificationMethod.Phone
            ? ' email'
            : ' phone number'}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
