export type User = {
  _id: string;
  firstName: string;
  lastName: string;
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
  white: User;
  black: User;
  result: MatchResult;
};

export type Round = {
  completed: boolean;
  matches: string[];
};

export interface Tournament {
  _id: string;
  name: string;
  date: Date;
  status: TournamentStatus;
  players: string[];
  rounds: Round[];
}

// export interface TournamentWithStats extends Tournament {
//   medianRating: number;
//   playerCount: number;
// }
