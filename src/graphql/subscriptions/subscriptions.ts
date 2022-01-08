import { gql } from '@apollo/client';

export const MATCH_UPDATED = gql`
  subscription MatchUpdated($matchIds: [ID!]!) {
    matchUpdated(matchIds: $matchIds) {
      _id
      white {
        _id
        firstName
        lastName
        photo
      }
      black {
        _id
        firstName
        lastName
        photo
      }
      whiteRating
      blackRating
      newWhiteRating
      newBlackRating
      boardNumber
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
