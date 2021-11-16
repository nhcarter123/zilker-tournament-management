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
  admin = 'admin',
  player = 'player'
}

export enum MatchResult {
  whiteWon = 'whiteWon',
  blackWon = 'blackWon',
  draw = 'draw',
  didNotStart = 'didNotStart'
}

export enum TournamentStatus {
  registration = 'registration',
  completed = 'completed',
  inactive = 'inactive'
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
  matches: string[];
};

export type RoundStatus = {
  completeCount: number;
  total: number;
};

export interface Tournament {
  _id: string;
  name: string;
  date: Date;
  status: TournamentStatus;
  players: string[];
  rounds: Round[];
  totalRounds: number;
}

// export interface TournamentWithStats extends Tournament {
//   medianRating: number;
//   playerCount: number;
// }
