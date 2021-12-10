export const getFirstLetter = (name: string): string =>
  name.substring(0, 1).toUpperCase();

export const getColorFromName = (name: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const rgb = [];

  for (i = 0; i < 3; i += 1) {
    let value = ((hash >> (i * 16)) & 0xff) - 50;

    if (value > 220) {
      value -= 30;
    }

    if (value < 30) {
      value += 30;
    }

    rgb.push(value);
  }

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};
