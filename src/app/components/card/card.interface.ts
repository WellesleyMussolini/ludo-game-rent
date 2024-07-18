import { IBoardGame } from "@/types/boardgame.interface";

export enum EnumCardStatus {
    AVAILABLE = "Disponível",
    RESERVED = "Reservado",
    FIXED_COPY="Cópia Fixa",
    QUARANTINE="Quarentena",
    UNAVAILABLE="Indisponível",
    MAINTENANCE="Manutenção",
    RENT="Alugado",
};

export interface ICard { boardgame: IBoardGame };