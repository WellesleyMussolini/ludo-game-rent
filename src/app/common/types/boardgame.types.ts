import { CardStatus } from "../components/card/types/card.types";

export type BoardGame = {
  id: string;
  name: string;
  image: string;
  price: string;
  status: CardStatus;
  ageToPlay: string;
  playTime: string;
  minimumPlayersToPlay: string;
  maximumPlayersToPlay: string;
  description: string;
};
