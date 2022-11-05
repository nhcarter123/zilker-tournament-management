import { gql } from '@apollo/client';

export const VERIFY_CODE = gql`
  mutation VerifyCode($code: String!) {
    verifyCode(code: $code) {
      _id
      token
    }
  }
`;

export const UPLOAD_PHOTO = gql`
  mutation UploadPhoto($photo: Upload!) {
    uploadPhoto(photo: $photo)
  }
`;

export const DELETE_PHOTO = gql`
  mutation DeletePhoto {
    deletePhoto
  }
`;

export const VERIFY_PHONE = gql`
  mutation VerifyPhone($phone: String!, $token: String!) {
    verifyPhone(phone: $phone, token: $token)
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($email: String!, $password: String!, $token: String!) {
    verifyEmail(email: $email, password: $password, token: $token)
  }
`;

export const LOGIN_EMAIL = gql`
  mutation LoginEmail($email: String!, $password: String!, $token: String!) {
    loginEmail(email: $email, password: $password, token: $token) {
      _id
      token
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const REFRESH_CHALLENGE = gql`
  mutation RefreshChallenge {
    refreshChallenge {
      _id
      challenge {
        expiresAt
        gameCode
      }
    }
  }
`;

export const UPDATE_USER_DETAILS = gql`
  mutation UpdateUserDetails($payload: UpdateUserDetailsPayload!) {
    updateUserDetails(payload: $payload)
  }
`;

export const CREATE_TOURNAMENT = gql`
  mutation CreateTournament($name: String!) {
    createTournament(name: $name) {
      _id
    }
  }
`;

export const UPDATE_TOURNAMENT = gql`
  mutation UpdateTournament(
    $tournamentId: ID!
    $payload: UpdateTournamentPayload!
  ) {
    updateTournament(tournamentId: $tournamentId, payload: $payload)
  }
`;

export const JOIN_TOURNAMENT = gql`
  mutation JoinTournament($organizationId: ID!, $tournamentId: ID) {
    joinTournament(
      organizationId: $organizationId
      tournamentId: $tournamentId
    ) {
      tournamentId
    }
  }
`;

export const KICK_PLAYER = gql`
  mutation KickPlayer($tournamentId: ID!, $userId: ID!) {
    kickPlayer(tournamentId: $tournamentId, userId: $userId)
  }
`;

export const NEXT_ROUND = gql`
  mutation CompleteRound(
    $tournamentId: ID!
    $newRound: Boolean!
    $textAlert: Boolean!
  ) {
    completeRound(
      tournamentId: $tournamentId
      newRound: $newRound
      textAlert: $textAlert
    )
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

export const JOIN_CHALLENGE = gql`
  mutation JoinChallenge($gameCode: ID!) {
    joinChallenge(gameCode: $gameCode)
  }
`;

export const END_CHALLENGE = gql`
  mutation EndChallenge($matchId: ID!) {
    endChallenge(matchId: $matchId)
  }
`;

export const UPLOAD_TOURNAMENT_PHOTO = gql`
  mutation UploadTournamentPhoto($tournamentId: ID!, $photo: Upload!) {
    uploadTournamentPhoto(tournamentId: $tournamentId, photo: $photo)
  }
`;

export const DELETE_TOURNAMENT_PHOTO = gql`
  mutation DeleteTournamentPhoto($tournamentId: ID!) {
    deleteTournamentPhoto(tournamentId: $tournamentId)
  }
`;

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization {
    createOrganization {
      _id
      name
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization(
    $organizationId: ID!
    $payload: UpdateOrganizationPayload!
  ) {
    updateOrganization(organizationId: $organizationId, payload: $payload)
  }
`;
