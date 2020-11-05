export const limitCharactor = (
  text: string,
  max: number,
  ellipsis = '...',
): string => {
  return text.length > max ? text.slice(0, max) + ellipsis : text;
};

export const zeroPad = (num: string | number, len: number) => {
  return `000000000${num}`.slice(-len);
};
