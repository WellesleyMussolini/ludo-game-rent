import { IBoardGame } from "@/interfaces/boardgame.interface";

export enum EnumCardStatus {
    AVAILABLE = "Disponível",
    RESERVED = "Reservado",
    FIXED_COPY="Cópia Fixa",
    QUARANTINE="Quarentena",
    UNAVAILABLE="Indisponível",
    MAINTENANCE="Manutenção",
    RENT="Alugado",
};

interface IBoardGameData extends IBoardGame { id: string };

export interface ICard { boardgame: IBoardGameData };