// database interface

export interface IBoardGame {
  id: string,
  name: string,
  image: string,
  price: string,
  status: string,
  ageToPlay: string,
  playTime: string,
  minimumPlayersToPlay: string,
  maximumPlayersToPlay: string,
  description: string,
};