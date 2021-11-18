export type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  rating: number;
  token: string;
  role: Role;
};

export enum Role {
  Admin = 'admin',
  Player = 'player'
}

export enum MatchResult {
  WhiteWon = 'whiteWon',
  BlackWon = 'blackWon',
  Draw = 'draw',
  DidNotStart = 'didNotStart'
}

export enum TournamentStatus {
  Created = 'created',
  Active = 'active',
  Completed = 'completed'
}

export type Match = {
  _id: string;
  white: string;
  black: string;
  whiteRating: number;
  blackRating: number;
  result: MatchResult;
  completed: boolean;
};

export type Round = {
  _id: string;
  completed: boolean;
  matches: Match[];
};

export type RoundPreview = {
  _id: string;
  completed: boolean;
  matches: string[];
};

export interface Tournament {
  _id: string;
  name: string;
  date: Date;
  status: TournamentStatus;
  players: string[];
  rounds: RoundPreview[];
  totalRounds: number;
}

// export interface TournamentWithStats extends Tournament {
//   medianRating: number;
//   playerCount: number;
// }
