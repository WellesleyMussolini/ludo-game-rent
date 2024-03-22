export const formatString = (boardgameName: string): string => {
    const words = boardgameName.split(' ');
    const formattedWords = words.map(word => word.toLowerCase());
    return formattedWords.join('-');
};