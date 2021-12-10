export enum Page {
  Login = '/login',
  MoreInfo = '/moreInfo',
  App = '/app',
  Profile = '/app/profile',
  Social = '/app/social',
  Rules = '/app/rules',
  Donate = '/app/donate',
  Upcoming = '/app/upcoming',
  Tournaments = '/app/tournaments',
  Tournament = '/app/tournament/:tournamentId',
  Details = '/app/tournament/:tournamentId/details',
  Join = '/app/tournament/:tournamentId/join', // todo move this???
  Waiting = '/app/tournament/:tournamentId/waiting',
  Match = '/app/tournament/:tournamentId/match/:matchId',
  EditMatch = '/app/tournament/:tournamentId/match/:matchId/edit'
}
