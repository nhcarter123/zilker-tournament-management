import * as seedrandom from 'seedrandom';
import { uniq } from 'lodash';
import { Tournament } from 'types/types';
import { Page } from 'types/page';

export const getFirstLetter = (name: string): string =>
  name.substring(0, 1).toUpperCase();

export const getColorFromName = (
  name: string,
  saturation = 50,
  lightness = 45
): string => {
  const hue = seedrandom.alea(name)() * 360;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const getUserAllUserIdsFromTournament = (
  tournament: Tournament
): string[] =>
  uniq([
    ...tournament.standings.map((standing) => standing.userId),
    ...tournament.players
  ]);

export const getPageName = (page: Page): string => {
  switch (page) {
    case Page.Home:
      return 'Home';
    case Page.Challenge:
      return 'Challenge';
    case Page.Tournaments:
      return 'Events';
    case Page.About:
      return 'About';
    case Page.Stats:
      return 'Stats';
    case Page.Profile:
      return 'Profile';
    case Page.Community:
      return 'Community';
    case Page.Donate:
      return 'Donate';
    case Page.History:
      return 'History';
    default:
      return 'Name missing';
  }
};
