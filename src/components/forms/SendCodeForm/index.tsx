import React, { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import * as EmailValidator from 'email-validator';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useStyles } from 'components/forms/SendCodeForm/styles';
import { Box, Typography } from '@mui/material/';
import { EVerificationMethod } from 'components/pages/LoginPage';

interface SignupValues {
  phoneNumber: string;
  email: string;
  password: string;
}

interface SendCodeFormProps {
  loading: boolean;
  hasSentCode: boolean;
  setHasSentCode: Dispatch<SetStateAction<boolean>>;
  loginEmail: Function;
  loginPhone: Function;
  verificationMethod: EVerificationMethod;
}

const getPasswordErrors = (password: string): Maybe<string> => {
  if (password.length < 8) {
    return 'Must be at least 8 characters';
  }

  if (password.length > 20) {
    return 'Cannot be greater than 20 characters';
  }
};

const SendCodeForm = ({
  loading,
  hasSentCode,
  setHasSentCode,
  loginEmail,
  loginPhone,
  verificationMethod
}: SendCodeFormProps): JSX.Element => {
  const classes = useStyles();

  const initialValues: SignupValues = {
    phoneNumber: '',
    email: '',
    password: ''
  };

  const { setFieldValue, setFieldError, values, errors, submitForm } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        if (values.phoneNumber) {
          loginPhone({
            variables: {
              phone: values.phoneNumber
            }
          });
        } else {
          loginEmail({
            variables: {
              email: values.email,
              password: values.password
            }
          });
        }

        setHasSentCode(true);
      }
    });

  return (
    <form
      onSubmit={(e): Promise<void> => {
        e.preventDefault();
        return submitForm();
      }}
    >
      <Box mt={4}>
        <Box mb={2}>
          {verificationMethod === EVerificationMethod.Phone ? (
            <PhoneInput
              className={classes.phoneInput}
              defaultCountry="US"
              placeholder="Phone number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={(e): void => {
                setFieldValue('phoneNumber', e);
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
              <Typography variant={'body2'} color={'#ff5a5a'}>
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
                    setFieldError(
                      'password',
                      getPasswordErrors(values.password)
                    )
                  }
                />
                <Typography variant={'body2'} color={'#ff5a5a'}>
                  {errors.password}
                </Typography>
              </Box>
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
                !getPasswordErrors(values.password))
            )
          }
          onSubmit={(e): Promise<void> => {
            e.preventDefault();
            return submitForm();
          }}
          block
        >
          {verificationMethod === EVerificationMethod.Phone && hasSentCode
            ? 'Resend code'
            : 'Login'}
        </Button>
      </Box>
    </form>
  );
};

export default SendCodeForm;
