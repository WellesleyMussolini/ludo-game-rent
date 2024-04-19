import { IBoardGame } from "@/interfaces/boardgame.interface";

export interface IBoardgameStats {
    boardgame: IBoardGame | null,
    iconSize?: string, 
    styles: string,
};
