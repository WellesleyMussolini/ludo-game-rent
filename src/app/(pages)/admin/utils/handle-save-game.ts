import { createBoardGame } from "@/app/services/create-boardgame";
import { iGameApiData } from "../interfaces/game-api-data.interface";
import { IBoardGame } from "@/interfaces/boardgame.interface";

export const handleSaveBoardGame = async (boardgame: IBoardGame, gameApiData: iGameApiData) => await createBoardGame({
    ...boardgame,
    name: gameApiData.name,
    image: gameApiData.image,
    status: gameApiData.status,
    price: gameApiData.price,
    ageToPlay: gameApiData.ageToPlay,
    description: gameApiData.description,
    playersToPlay: {
        maximum: gameApiData.playersToPlay.maximum,
        minimum: gameApiData.playersToPlay.minimum,
    },
    playTime: gameApiData.playTime,
});