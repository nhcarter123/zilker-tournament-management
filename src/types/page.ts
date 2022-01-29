export enum Page {
  Login = '/login',
  MoreInfo = '/moreInfo',
  App = '/app',
  Profile = '/app/profile',
  Social = '/app/social',
  Rules = '/app/rules',
  Donate = '/app/donate',
  Stats = '/app/stats',
  Tournaments = '/app/tournaments',
  Tournament = '/app/tournament/:tournamentId',
  Search = '/app/search',
  ViewMatch = '/app/tournament/:tournamentId/view/match/:matchId',
  ViewTournament = '/app/tournament/:tournamentId/view'
}
