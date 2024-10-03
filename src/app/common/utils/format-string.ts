export const formatStringForApi = (boardgameName: string): string => {
  return boardgameName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formatStringForUrl = (boardgameName: string): string => {
  return boardgameName.toLowerCase().replace(/\s+/g, "-");
};
