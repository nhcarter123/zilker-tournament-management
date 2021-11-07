import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';

import { makeStyles } from '@material-ui/core';

// todo move to other folder
const useStyles = makeStyles({
  root: {
    padding: '2px'
  },
  row: {
    paddingBottom: '12px'
  }
});

interface AddPlayerValues {
  firstName: string;
  lastName: string;
  rating: number;
}

const AddPlayerForm = (): JSX.Element => {
  const classes = useStyles();

  const initialValues: AddPlayerValues = {
    firstName: '',
    lastName: '',
    rating: 1000
  };

  const AddPlayerSchema = Yup.object().shape({
    firstName: Yup.string().max(30, 'Name is too long').required('Required'),
    lastName: Yup.string().max(30, 'Name is too long').required('Required'),
    rating: Yup.number()
      .typeError('Rating must be a number')
      .required('Required')
  });

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={AddPlayerSchema}
      onSubmit={(values, actions): void => {
        actions.setSubmitting(false);
      }}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        setFieldTouched,
        isValid
      }): JSX.Element => (
        <Form>
          <div className={classes.root}>
            <div className={classes.row}>
              <TextField
                error={!!errors.firstName && touched.firstName}
                id="firstName"
                label="First Name"
                onChange={(e): void => {
                  setFieldTouched('firstName');
                  handleChange(e);
                }}
                value={values.firstName}
                variant="outlined"
                helperText={touched.firstName ? errors.firstName : ''}
                required
              />
            </div>

            <div className={classes.row}>
              <TextField
                error={!!errors.lastName && touched.lastName}
                id="lastName"
                label="Last Name"
                onChange={(e): void => {
                  setFieldTouched('lastName');
                  handleChange(e);
                }}
                value={values.lastName}
                variant="outlined"
                helperText={touched.lastName ? errors.lastName : ''}
                required
              />
            </div>

            <div className={classes.row}>
              <TextField
                error={!!errors.rating && touched.rating}
                id="rating"
                label="Rating"
                onChange={(e): void => {
                  setFieldTouched('rating');
                  handleChange(e);
                }}
                value={values.rating}
                helperText={touched.rating ? errors.rating : ''}
                variant="outlined"
                required
              />
            </div>

            <Button type="primary" htmlType="submit" disabled={!isValid}>
              Add Player
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddPlayerForm;
