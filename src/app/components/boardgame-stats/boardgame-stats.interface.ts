import { IBoardGame } from "@/types/boardgame.interface";

export interface IBoardgameStats {
    boardgame: IBoardGame | null,
    iconSize?: string, 
    styles: string,
};
