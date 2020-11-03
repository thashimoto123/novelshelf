export type GenreMap = {
  [genreName: string]: string;
};

export const getGenre = (gcode: string | number, genreMap: GenreMap) => {
  const genre: string[] = [];
  if (!gcode) {
    return genre;
  }

  String(gcode)
    .split('-')
    .forEach((code) => {
      if (genreMap[code]) {
        genre.push(genreMap[code]);
      }
    });

  return genre;
};
