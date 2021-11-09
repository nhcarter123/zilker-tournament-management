import { gql } from '@apollo/client';

export const VERIFY_CODE = gql`
  mutation VerifyCode($code: Int!) {
    verifyCode(code: $code) {
      phone
      auth {
        accessToken
        refreshToken
      }
    }
  }
`;

export const SEND_VERIFICATION_CODE = gql`
  mutation SendVerificationCode($phone: String!) {
    sendVerificationCode(phone: $phone)
  }
`;
