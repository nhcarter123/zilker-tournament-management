import * as seedrandom from 'seedrandom';

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
