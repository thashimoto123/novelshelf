export type GenreMap = {
  [genreName: string]: string;
};

export const getGenre = (gcode: string | number, genreMap: GenreMap) => {
  const genre: { [genreName: string]: boolean } = {};
  if (!gcode) {
    return genre;
  }

  String(gcode)
    .split('-')
    .forEach((code) => {
      if (genreMap[code]) {
        genre[genreMap[code]] = true;
      }
    });

  return genre;
};
