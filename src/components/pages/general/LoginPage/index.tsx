import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { onError } from 'graphql/errorHandler';
import {
  VERIFY_CODE,
  SEND_VERIFICATION_CODE
} from 'graphql/mutations/mutations';

import ContentHeader from 'components/ContentHeader';
import SendCodeForm from 'components/forms/SendCodeForm';
import CodeInput from 'components/CodeInput';

const LoginPage = (): JSX.Element => {
  const [hasSentCode, setHasSentCode] = useState(false);

  const [verifyCode, { loading: verifyCodeLoading }] = useMutation(
    VERIFY_CODE,
    { onError }
  );
  const [sendVerificationCode, { loading: verificationCodeLoading }] =
    useMutation(SEND_VERIFICATION_CODE, { onError });

  return (
    <>
      {verifyCodeLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ContentHeader title={'Welcome'} />
          <SendCodeForm
            hasSentCode={hasSentCode}
            setHasSentCode={setHasSentCode}
            sendVerificationCode={sendVerificationCode}
            loading={verificationCodeLoading}
          />
          {hasSentCode && !verificationCodeLoading && (
            <CodeInput verifyCode={verifyCode} />
          )}
        </>
      )}
    </>
  );
};

export default LoginPage;
