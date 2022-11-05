import { gql } from '@apollo/client';

export const CHALLENGE_UPDATED = gql`
  subscription ChallengeUpdated($hostIds: [ID!]!) {
    challengeUpdated(hostIds: $hostIds) {
      hostId
      completed
    }
  }
`;

export const MATCH_UPDATED = gql`
  subscription MatchUpdated($matchIds: [ID!]!) {
    matchUpdated(matchIds: $matchIds) {
      _id
      whiteScore
      blackScore
      whiteRating
      blackRating
      newWhiteRating
      newBlackRating
      result
    }
  }
`;

export const TOURNAMENT_UPDATED = gql`
  subscription TournamentUpdated($tournamentIds: [ID!]!) {
    tournamentUpdated(tournamentIds: $tournamentIds) {
      tournament {
        _id
        name
        date
        status
        players
        organizationId
        rounds {
          _id
          matches
          completed
        }
        config {
          totalRounds
          maxPunchDown
          performanceWeight
          skillGroupCount
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
          initialRating
        }
        pairingAlgorithm
      }
      newRound
    }
  }
`;
