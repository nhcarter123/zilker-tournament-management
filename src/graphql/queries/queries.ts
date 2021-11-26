import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      phone
      firstName
      lastName
      rating
      matchesPlayed
      role
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      _id
      firstName
      lastName
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

export const GET_ACTIVE_TOURNAMENT = gql`
  query GetActiveTournament {
    getActiveTournament {
      _id
      name
      date
      status
      players
      rounds {
        _id
        completed
      }
      totalRounds
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
      rounds {
        _id
        completed
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
      }
      black {
        _id
        firstName
        lastName
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

export const GET_MY_MATCH = gql`
  query GetMyMatch {
    getMyMatch {
      _id
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
        white
        black
        boardNumber
        result
      }
    }
  }
`;
