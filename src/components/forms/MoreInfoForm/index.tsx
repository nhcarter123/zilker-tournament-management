import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';

import { makeStyles } from '@material-ui/core';

// todo move to other folder
const useStyles = makeStyles({
  root: {
    // padding: '2px'
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

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(30, 'Name is too long').required('Required'),
    lastName: Yup.string().max(30, 'Name is too long').required('Required'),
    rating: Yup.number()
      .typeError('Rating must be a number')
      .required('Required')
  });

  const { setFieldTouched, handleChange, values, errors, touched, isValid } =
    useFormik({
      initialValues,
      validateOnMount: true,
      validationSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      }
    });

  return (
    <form>
      <div className={classes.root}>
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
    </form>
  );
};

export default AddPlayerForm;
