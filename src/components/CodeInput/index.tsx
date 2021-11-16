import React from 'react';
import ReactCodeInput from 'react-code-input';
import { useStyles } from 'components/CodeInput/styles';

interface CodeInputProps {
  verifyCode: Function;
}

const CodeInput = (props: CodeInputProps): JSX.Element => {
  const classes = useStyles();

  const handleChange = (value: string): void => {
    if (value.length === 4) {
      props.verifyCode({ variables: { code: value } });
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.description}>Enter the code below</div>
        <ReactCodeInput
          type="number"
          fields={4}
          name={'code'}
          inputMode={'numeric'}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CodeInput;
