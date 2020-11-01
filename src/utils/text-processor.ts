export const limitCharactor = (
  text: string,
  max: number,
  ellipsis = '...',
): string => {
  return text.length > max ? text.slice(0, max) + ellipsis : text;
};
