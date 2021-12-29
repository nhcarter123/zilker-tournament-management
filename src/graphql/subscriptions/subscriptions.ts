import { gql } from '@apollo/client';

export const MATCH_UPDATED = gql`
  subscription MatchUpdated($matchIds: [ID!]!) {
    matchUpdated(matchIds: $matchIds) {
      _id
      result
      newWhiteRating
      newBlackRating
    }
  }
`;

export const NEW_ROUND_STARTED = gql`
  subscription NewRoundStarted($tournamentId: ID!) {
    newRoundStarted(tournamentId: $tournamentId) {
      tournamentId
    }
  }
`;
