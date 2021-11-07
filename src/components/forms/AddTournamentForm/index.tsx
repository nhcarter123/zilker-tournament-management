import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button, Input, DatePicker } from 'antd';
import moment, { Moment } from 'moment';

import { makeStyles } from '@material-ui/core';

const { TextArea } = Input;

// todo move to other folder
const useStyles = makeStyles({
  root: {
    padding: '2px'
  },
  row: {
    paddingBottom: '12px'
  }
});

interface AddTournamentValues {
  name: string;
  description: string;
  date: Moment;
}

const AddPlayerForm = (): JSX.Element => {
  const classes = useStyles();

  const initialValues: AddTournamentValues = {
    name: '',
    description: '',
    date: moment()
  };

  const AddTournamentSchema = Yup.object().shape({
    name: Yup.string().max(40, 'Name is too long').required('Required'),
    description: Yup.string().max(200, 'Description is too long'),
    date: Yup.date().required('Required')
  });

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validationSchema={AddTournamentSchema}
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
        setFieldValue,
        isValid
      }): JSX.Element => (
        <Form>
          <div className={classes.root}>
            <div className={classes.row}>
              <TextField
                error={!!errors.name && touched.name}
                id="name"
                label="Name"
                onChange={(e): void => {
                  setFieldTouched('name');
                  handleChange(e);
                }}
                value={values.name}
                variant="outlined"
                helperText={touched.name ? errors.name : ''}
                required
              />
            </div>

            <div className={classes.row}>
              <TextArea
                id={'description'}
                maxLength={200}
                value={values.description}
                onChange={handleChange}
                autoSize={{ maxRows: 10 }}
                showCount
              />
            </div>

            <div className={classes.row}>
              <Input.Group compact>
                <DatePicker
                  id={'date'}
                  value={values.date}
                  format={'MM/DD/YYYY'}
                  onChange={(value): void => setFieldValue('date', value)}
                />
              </Input.Group>
            </div>

            <Button type="primary" htmlType="submit" disabled={!isValid}>
              Add Tournament
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddPlayerForm;

// <TextField
//                 className={classes.description}
//                 error={!!errors.description && touched.description}
//                 id="description"
//                 label="Description"
//                 onChange={(e): void => {
//                   setFieldTouched('description');
//                   handleChange(e);
//                 }}
//                 value={values.description}
//                 variant="outlined"
//                 helperText={touched.description ? errors.description : ''}
//                 inputProps={{ maxLength: 201 }}
//                 multiline
//               />
