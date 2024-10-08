import { BoardGame } from "@/app/common/types/boardgame.types";

export interface ResponseBoardGame extends BoardGame {
  _id: string;
}

class BoardGameMapper {
  toDomain(persistence: ResponseBoardGame): BoardGame {
    return {
      id: persistence._id,
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
}

export default new BoardGameMapper();
