import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      phone
      firstName
      lastName
      rating
      role
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
        completed
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
      rounds {
        completed
      }
    }
  }
`;
