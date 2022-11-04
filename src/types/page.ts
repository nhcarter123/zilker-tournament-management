export enum Page {
  Home = '/home',
  History = '/history',
  Stats = '/stats',
  Profile = '/profile',
  Login = '/login',
  MoreInfo = '/moreInfo',
  Challenge = '/home/challenge',
  About = '/home/about',
  Community = '/home/community',
  Donate = '/home/donate',
  Tournament = '/home/tournament/:tournamentId',
  Tournaments = '/home/tournaments',
  ViewTournament = '/home/tournament/:tournamentId/view',
  ViewTournamentMatch = '/home/tournament/:tournamentId/view/match/:matchId',
  ViewSoloMatch = '/home/match/:matchId'
}
