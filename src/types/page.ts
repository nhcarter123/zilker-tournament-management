export enum Page {
  Home = '/home',
  History = '/home/history',
  ViewSoloMatch = '/home/history/match/:matchId',
  Stats = '/home/stats',
  About = '/home/about',
  Community = '/home/community',
  Donate = '/home/donate',
  Profile = '/profile',
  Login = '/login',
  MoreInfo = '/moreInfo',
  Challenge = '/challenge',
  Tournament = '/event/:tournamentId',
  Tournaments = '/events',
  ViewTournament = '/event/:tournamentId/view',
  ViewTournamentMatch = '/event/:tournamentId/view/match/:matchId'
}
