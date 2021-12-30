export enum Page {
  Login = '/login',
  MoreInfo = '/moreInfo',
  App = '/app',
  Profile = '/app/profile',
  Social = '/app/social',
  Rules = '/app/rules',
  Donate = '/app/donate',
  Tournaments = '/app/listTournament',
  Tournament = '/app/tournament/:tournamentId',
  ViewMatch = '/app/tournament/:tournamentId/view/match/:matchId',
  ViewTournament = '/app/tournament/:tournamentId/view'
}
