import { gql } from '@apollo/client';

export const VERIFY_CODE = gql`
  mutation VerifyCode($code: String!) {
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

export const CREATE_TOURNAMENT = gql`
  mutation CreateTournament($name: String!) {
    createTournament(name: $name)
  }
`;

export const JOIN_TOURNAMENT = gql`
  mutation JoinTournament($tournamentId: String!, $userId: String!) {
    joinTournament(tournamentId: $tournamentId, userId: $userId)
  }
`;
