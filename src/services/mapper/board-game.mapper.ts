import { IBoardGame } from "@/types/boardgame.interface";
import { ResponseBoardGame } from "../types/board-games.types";

class BoardGameMapper {
  toDomain(persistence: ResponseBoardGame): IBoardGame {
    return {
      id: persistence.id,
      name: persistence.name,
      image: persistence.image,
      price: persistence.price,
      status: persistence.status,
      ageToPlay: persistence.ageToPlay,
      playTime: persistence.playTime,
      minimumPlayersToPlay: persistence.minimumPlayersToPlay,
      maximumPlayersToPlay: persistence.maximumPlayersToPlay,
      description: persistence.description,
    };
  }
};

export default new BoardGameMapper();