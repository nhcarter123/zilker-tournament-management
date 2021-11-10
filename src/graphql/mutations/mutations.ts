import { gql } from '@apollo/client';

export const VERIFY_CODE = gql`
  mutation VerifyCode($code: Int!) {
    verifyCode(code: $code) {
      token
    }
  }
`;

export const SEND_VERIFICATION_CODE = gql`
  mutation SendVerificationCode($phone: String!) {
    sendVerificationCode(phone: $phone)
  }
`;

export const UPDATE_USER_DETAILS = gql`
  mutation UpdateUserDetails($args: UpdateUserDetailsArgs!) {
    updateUserDetails(args: $args) {
      phone
    }
  }
`;
