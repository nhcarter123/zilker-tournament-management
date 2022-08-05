import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      phone
      photo
      firstName
      lastName
      rating
      matchesPlayed
      role
      organizationId
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
      rounds {
        _id
        matches
        completed
      }
      config {
        totalRounds
        maxPunchDown
        performanceWeight
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
      }
      black {
        _id
        firstName
        lastName
        photo
      }
      whiteRating
      blackRating
      whiteScore
      blackScore
      newWhiteRating
      newBlackRating
      boardNumber
      result
    }
  }
`;

export const GET_MY_MATCH = gql`
  query GetMyMatch($tournamentId: ID!) {
    getMyMatch(tournamentId: $tournamentId) {
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
      whiteScore
      blackScore
      newWhiteRating
      newBlackRating
      boardNumber
      result
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
