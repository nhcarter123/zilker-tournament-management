import { gql } from '@apollo/client';

// TODO optimize with fragments

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      phone
      email
      photo
      firstName
      lastName
      rating
      matchesPlayed
      role
      organizationId
      challenge {
        expiresAt
        gameCode
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($userIds: [ID!]!, $filterTerm: String) {
    getUsers(userIds: $userIds, filterTerm: $filterTerm) {
      _id
      firstName
      lastName
      rating
    }
  }
`;

export const GET_MY_TOURNAMENT = gql`
  query GetMyTournament {
    getMyTournament {
      _id
      players
      standings {
        _id
        userId
      }
    }
  }
`;

export const GET_TOURNAMENTS = gql`
  query GetTournaments {
    getTournaments {
      _id
      name
      date
      status
      players
      standings {
        _id
        userId
      }
      photo
      organizationId
      organization {
        _id
        name
      }
    }
  }
`;

export const GET_TOURNAMENT = gql`
  query GetTournament($tournamentId: ID!) {
    getTournament(tournamentId: $tournamentId) {
      _id
      name
      date
      status
      pairingAlgorithm
      players
      organizationId
      photo
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
    }
  }
`;

export const GET_MATCH = gql`
  query GetMatch($matchId: ID!) {
    getMatch(matchId: $matchId) {
      _id
      white {
        _id
        firstName
        lastName
        photo
        rating
      }
      black {
        _id
        firstName
        lastName
        photo
        rating
      }
      whiteRating
      blackRating
      whiteScore
      blackScore
      newWhiteRating
      newBlackRating
      boardNumber
      completed
      result
    }
  }
`;

export const GET_MY_MATCH = gql`
  query GetMyMatch($tournamentId: ID!) {
    getMyMatch(tournamentId: $tournamentId) {
      _id
      tournamentId
      white {
        _id
        firstName
        lastName
        photo
        rating
      }
      black {
        _id
        firstName
        lastName
        photo
        rating
      }
      whiteRating
      blackRating
      whiteScore
      blackScore
      newWhiteRating
      newBlackRating
      boardNumber
      completed
      result
    }
  }
`;

export const GET_MY_CHALLENGE_MATCH = gql`
  query GetMyMatch {
    getMyChallengeMatch {
      _id
      tournamentId
      hostId
      white {
        _id
        firstName
        lastName
        photo
        rating
      }
      black {
        _id
        firstName
        lastName
        photo
        rating
      }
      whiteRating
      blackRating
      whiteScore
      blackScore
      newWhiteRating
      newBlackRating
      boardNumber
      completed
      result
    }
  }
`;

export const GET_MY_MATCH_HISTORY = gql`
  query getMyMatchHistory {
    getMyMatchHistory {
      tournaments {
        _id
        name
        date
        rounds {
          _id
        }
      }
      matches {
        _id
        tournamentId
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
  }
`;

export const GET_ROUND = gql`
  query GetRound($tournamentId: ID!, $roundId: ID!) {
    getRound(tournamentId: $tournamentId, roundId: $roundId) {
      _id
      completed
      matches {
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
  }
`;

export const GET_ORGANIZATION = gql`
  query GetOrganization($organizationId: ID!) {
    getOrganization(organizationId: $organizationId) {
      _id
      name
    }
  }
`;
