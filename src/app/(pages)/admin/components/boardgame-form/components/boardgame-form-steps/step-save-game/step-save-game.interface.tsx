import { iGameApiData } from "@/app/(pages)/admin/interfaces/game-api-data.interface";
import { ICard } from "@/interfaces/card.interface";

export interface IBoardGameFormStepSaveGame extends ICard {
    isLoading: boolean,
    boardgameData: iGameApiData,
    handleCloseForm: () => void,
    handleSaveGame: () => void,
    handleReturnPreviousStep: () => void,
    handleOnChangeFields: (field: string, event: React.ChangeEvent<HTMLInputElement> | string) => void,
};