import { iGameApiData } from "@/app/(pages)/admin/interfaces/game-api-data.interface";

export interface IBoardGameFormStepSaveGame {
    isLoading: boolean,
    boardgameData: iGameApiData,
    handleCloseForm: () => void,
    handleSaveGame: () => void,
    handleReturnPreviousStep: () => void,
    handleOnChangeFields: (field: string, event: React.ChangeEvent<HTMLInputElement> | string) => void,
};