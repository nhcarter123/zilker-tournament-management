export enum Page {
  Home = '/home',
  History = '/history',
  Stats = '/stats',
  Profile = '/profile',
  Login = '/login',
  MoreInfo = '/moreInfo',
  Tournament = '/home/tournament/:tournamentId',
  ViewTournament = '/home/tournament/:tournamentId/view',
  ViewTournamentMatch = '/home/tournament/:tournamentId/view/match/:matchId',
  ViewSoloMatch = '/home/match/:matchId',
  ViewHistoryTournament = '/history/tournament/:tournamentId/view',
  ViewHistoryMatch = '/history/match/:matchId'
}
