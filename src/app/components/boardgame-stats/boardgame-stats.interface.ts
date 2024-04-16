import { IBoardGame } from "@/interfaces/boardgame.interface";

export interface IBoardgameStats {
    boardgame: IBoardGame,
    iconSize?: string, 
    styles: string,
};