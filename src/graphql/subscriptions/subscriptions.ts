import { gql } from '@apollo/client';

export const MATCH_UPDATED = gql`
  subscription MatchUpdated($matchIds: [ID!]!) {
    matchUpdated(matchIds: $matchIds) {
      _id
      whiteRating
      blackRating
      newWhiteRating
      newBlackRating
      result
    }
  }
`;

export const TOURNAMENT_UPDATED = gql`
  subscription TournamentUpdated($tournamentId: ID!) {
    tournamentUpdated(tournamentId: $tournamentId) {
      tournament {
        _id
        name
        date
        status
        players
        rounds {
          _id
          matches
          completed
        }
        standings {
          _id
          userId
          position
          score
          win
          loss
          draw
          bye
        }
        totalRounds
      }
      newRound
    }
  }
`;
