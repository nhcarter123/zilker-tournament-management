import React, { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from 'antd';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useStyles } from 'components/forms/SendCodeForm/styles';
import { Box } from '@mui/material/';

interface SignupValues {
  phoneNumber: string;
}

interface SendCodeFormProps {
  loading: boolean;
  hasSentCode: boolean;
  setHasSentCode: Dispatch<SetStateAction<boolean>>;
  sendVerificationCode: Function;
}

const SendCodeForm = (props: SendCodeFormProps): JSX.Element => {
  const classes = useStyles();

  const initialValues: SignupValues = { phoneNumber: '' };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('You must enter your phone number')
  });

  const { setFieldTouched, setFieldValue, values, isValid, submitForm } =
    useFormik({
      initialValues,
      validateOnMount: true,
      validationSchema,
      onSubmit: (values) => {
        props.sendVerificationCode({
          variables: { phone: values.phoneNumber }
        });
        props.setHasSentCode(true);
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
        <div className={classes.row}>
          <PhoneInput
            className={classes.phoneInput}
            defaultCountry="US"
            placeholder="Phone number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={(e): void => {
              setFieldTouched('phoneNumber');
              setFieldValue('phoneNumber', e);
            }}
          />
        </div>

        <Button
          loading={props.loading}
          size={'large'}
          type="primary"
          htmlType={'submit'}
          disabled={!isValid || props.loading}
          onSubmit={(e): Promise<void> => {
            e.preventDefault();
            return submitForm();
          }}
          block
        >
          {props.hasSentCode ? 'Resend code' : 'Send me a code'}
        </Button>
      </Box>
    </form>
  );
};

export default SendCodeForm;
