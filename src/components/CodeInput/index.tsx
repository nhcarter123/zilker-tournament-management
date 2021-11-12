import React from 'react';
import { makeStyles } from '@mui/styles';
import ReactCodeInput from 'react-code-input';

// todo move to other folder
const useStyles = makeStyles({
  root: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center'
  },
  description: {
    textAlign: 'center',
    marginBottom: '6px'
  }
});

interface CodeInputProps {
  verifyCode: Function;
}

const CodeInput = (props: CodeInputProps): JSX.Element => {
  const classes = useStyles();

  const handleChange = (value: string): void => {
    if (value.length === 6) {
      props.verifyCode({ variables: { code: value } });
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.description}>Enter the code below</div>
        <ReactCodeInput
          type="number"
          fields={6}
          name={'code'}
          inputMode={'numeric'}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CodeInput;
