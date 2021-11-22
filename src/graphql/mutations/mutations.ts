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
  mutation UpdateUserDetails($payload: UpdateUserDetailsPayload!) {
    updateUserDetails(payload: $payload)
  }
`;

export const CREATE_TOURNAMENT = gql`
  mutation CreateTournament($name: String!) {
    createTournament(name: $name)
  }
`;

export const UPDATE_TOURNAMENT = gql`
  mutation UpdateTournament($name: String!) {
    createTournament(name: $name)
  }
`;

export const JOIN_TOURNAMENT = gql`
  mutation JoinTournament($tournamentId: ID!, $userId: ID!) {
    joinTournament(tournamentId: $tournamentId, userId: $userId)
  }
`;

export const KICK_PLAYER = gql`
  mutation KickPlayer($tournamentId: ID!, $userId: ID!) {
    kickPlayer(tournamentId: $tournamentId, userId: $userId)
  }
`;

export const NEXT_ROUND = gql`
  mutation CompleteRound($tournamentId: ID!, $newRound: Boolean!) {
    completeRound(tournamentId: $tournamentId, newRound: $newRound)
  }
`;

export const DELETE_ROUND = gql`
  mutation DeleteRound($tournamentId: ID!, $roundId: ID!) {
    deleteRound(tournamentId: $tournamentId, roundId: $roundId)
  }
`;

export const UPDATE_MATCH = gql`
  mutation UpdateMatch($matchId: ID!, $payload: UpdateMatchPayload!) {
    updateMatch(matchId: $matchId, payload: $payload)
  }
`;
