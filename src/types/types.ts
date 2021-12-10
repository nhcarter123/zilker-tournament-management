export type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  phone: string;
  rating: number;
  matchesPlayed: number;
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
  tournamentId: string;
  white: string;
  black: string;
  whiteRating: number;
  blackRating: number;
  newWhiteRating?: number;
  newBlackRating?: number;
  whiteMatchesPlayed: number;
  blackMatchesPlayed: number;
  boardNumber: number;
  result: MatchResult;
  completed: boolean;
};

export interface MatchWithUserInfo extends Omit<Match, 'white' | 'black'> {
  white: User | null;
  black: User | null;
}

export type Standing = {
  _id: string;
  userId: string;
  position: number;
  score: number;
  win: number;
  loss: number;
  draw: number;
  bye: number;
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

export type Tournament = {
  _id: string;
  name: string;
  date: Date;
  status: TournamentStatus;
  players: string[];
  rounds: RoundPreview[];
  standings: Standing[];
  totalRounds: number;
};

// export interface TournamentWithStats extends Tournament {
//   medianRating: number;
//   playerCount: number;
// }
