import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from 'antd';
import { TextField } from '@mui/material';
import { useStyles } from 'components/forms/GetMoreDetailsForm/styles';

interface AddPlayerValues {
  firstName: string;
  lastName: string;
  rating: number;
}

interface GetMoreDetailsFormProps {
  updateUserDetails: Function;
}

const GetMoreDetailsForm = ({
  updateUserDetails
}: GetMoreDetailsFormProps): JSX.Element => {
  const classes = useStyles();

  const initialValues: AddPlayerValues = {
    firstName: '',
    lastName: '',
    rating: 1000
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(30, 'Name is too long').required('Required'),
    lastName: Yup.string().max(30, 'Name is too long').required('Required'),
    rating: Yup.number()
      .typeError('Rating must be a number')
      .max(2500, 'Cannot be higher than 2500')
      .min(500, 'Cannot be lower than 500')
      .required('Required')
  });

  const {
    setFieldTouched,
    handleChange,
    values,
    errors,
    touched,
    isValid,
    submitForm
  } = useFormik({
    initialValues,
    validateOnMount: true,
    validateOnBlur: true,
    validationSchema,
    onSubmit: (values) => {
      updateUserDetails({
        variables: {
          args: {
            firstName: values.firstName,
            lastName: values.lastName,
            rating: values.rating
          }
        }
      });
    }
  });

  return (
    <form
      onSubmit={(e): Promise<void> => {
        e.preventDefault();
        return submitForm();
      }}
    >
      <div className={classes.root}>
        <TextField
          className={classes.input}
          error={!!errors.firstName && touched.firstName}
          id="firstName"
          label="First Name"
          onChange={(e): void => {
            setFieldTouched('firstName');
            e.target.value = e.target.value.replace(/[^a-zA-Z]/, '');
            handleChange(e);
          }}
          value={values.firstName}
          variant="outlined"
          helperText={touched.firstName ? errors.firstName : ''}
          required
        />

        <TextField
          className={classes.input}
          error={!!errors.lastName && touched.lastName}
          id="lastName"
          label="Last Name"
          onChange={(e): void => {
            setFieldTouched('lastName');
            e.target.value = e.target.value.replace(/[^a-zA-Z]/, '');
            handleChange(e);
          }}
          value={values.lastName}
          variant="outlined"
          helperText={touched.lastName ? errors.lastName : ''}
          required
        />

        <TextField
          className={classes.input}
          error={!!errors.rating && touched.rating}
          id="rating"
          label="Rating"
          onChange={(e): void => {
            setFieldTouched('rating');
            e.target.value = e.target.value.replace(/[^0-9]/, '');
            handleChange(e);
          }}
          value={values.rating}
          helperText={touched.rating ? errors.rating : ''}
          variant="outlined"
          required
        />

        <Button
          className={classes.button}
          size={'large'}
          type="primary"
          htmlType={'submit'}
          disabled={!isValid}
          onSubmit={(e): Promise<void> => {
            e.preventDefault();
            return submitForm();
          }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default GetMoreDetailsForm;
