import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import * as EmailValidator from 'email-validator';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useStyles } from 'components/forms/SendCodeForm/styles';
import { Box, Typography } from '@mui/material/';
import { EVerificationMethod } from 'components/pages/LoginPage';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface SignupValues {
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const getPasswordErrors = (password: string): Maybe<string> => {
  if (password.length < 8) {
    return 'Must be at least 8 characters';
  }

  if (password.length > 20) {
    return 'Cannot be greater than 20 characters';
  }
};

const getConfirmPasswordErrors = (
  password: string,
  confirmPassword: string
): Maybe<string> => {
  if (password !== confirmPassword) {
    return 'Passwords do no match';
  }
};

interface SendCodeFormProps {
  loading: boolean;
  hasSentCode: boolean;
  verifyPhone: Function;
  verifyEmail: Function;
  loginEmail: Function;
  verificationMethod: EVerificationMethod;
  isNewUser: boolean;
}

const SendCodeForm = ({
  loading,
  hasSentCode,
  verifyPhone,
  verifyEmail,
  loginEmail,
  isNewUser,
  verificationMethod
}: SendCodeFormProps): JSX.Element => {
  const classes = useStyles();
  const [token, setToken] = useState('');

  const initialValues: SignupValues = {
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    let isMounted = true;

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    executeRecaptcha('yourAction').then((token) => {
      if (isMounted) {
        setToken(token);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [executeRecaptcha]);

  const { setFieldValue, setFieldError, values, errors, submitForm } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        void handleReCaptchaVerify();

        if (values.phoneNumber) {
          verifyPhone({
            variables: {
              phone: values.phoneNumber,
              token
            }
          });
        } else if (isNewUser) {
          verifyEmail({
            variables: {
              email: values.email,
              password: values.password,
              token
            }
          });
        } else {
          loginEmail({
            variables: {
              email: values.email,
              password: values.password,
              token
            }
          });
        }
      }
    });

  return (
    <form
      onSubmit={(e): Promise<void> => {
        e.preventDefault();
        return submitForm();
      }}
    >
      <Box mb={2}>
        {verificationMethod === EVerificationMethod.Phone ? (
          <PhoneInput
            className={classes.phoneInput}
            defaultCountry="US"
            placeholder="Phone number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={(e): void => {
              setFieldValue('phoneNumber', e || '');
            }}
          />
        ) : (
          <Box>
            <Input
              id={'email'}
              placeholder="Email"
              size={'large'}
              status={errors.email ? 'error' : undefined}
              onChange={(e): void => {
                setFieldValue('email', e.target.value);
              }}
              onBlur={() =>
                setFieldError(
                  'email',
                  EmailValidator.validate(values.email)
                    ? undefined
                    : 'Invalid email'
                )
              }
            />
            <Typography variant={'body2'} color={'#ff5454'}>
              {errors.email}
            </Typography>

            <Box mt={1}>
              <Input
                placeholder="Password"
                size={'large'}
                type={'password'}
                status={errors.password ? 'error' : undefined}
                onChange={(e): void => {
                  setFieldValue('password', e.target.value);
                }}
                onBlur={() =>
                  setFieldError('password', getPasswordErrors(values.password))
                }
              />
              <Typography variant={'body2'} color={'#ff5454'}>
                {errors.password}
              </Typography>
            </Box>

            {isNewUser && (
              <Box mt={1}>
                <Input
                  placeholder="Confirm password"
                  size={'large'}
                  type={'password'}
                  status={errors.confirmPassword ? 'error' : undefined}
                  onChange={(e): void => {
                    setFieldValue('confirmPassword', e.target.value);
                  }}
                  onBlur={() =>
                    setFieldError(
                      'confirmPassword',
                      getConfirmPasswordErrors(
                        values.password,
                        values.confirmPassword
                      )
                    )
                  }
                />
                <Typography variant={'body2'} color={'#ff5a5a'}>
                  {errors.confirmPassword}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>

      <Button
        loading={loading}
        size={'large'}
        type="primary"
        htmlType={'submit'}
        disabled={
          loading ||
          !(
            values.phoneNumber.length ||
            (EmailValidator.validate(values.email) &&
              !getPasswordErrors(values.password) &&
              (!getConfirmPasswordErrors(
                values.password,
                values.confirmPassword
              ) ||
                !isNewUser))
          )
        }
        onSubmit={(e): Promise<void> => {
          e.preventDefault();
          return submitForm();
        }}
        block
      >
        {verificationMethod === EVerificationMethod.Phone
          ? hasSentCode
            ? 'Send new code'
            : 'Login'
          : isNewUser
          ? hasSentCode
            ? 'Send new code'
            : 'Register'
          : 'Login'}
      </Button>
    </form>
  );
};

export default SendCodeForm;
