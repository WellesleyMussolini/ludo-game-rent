import { iGameApiData } from "@/app/(admin)/admin/interfaces/game-api-data.interface";

export interface IBoardGameFormStepSaveGame {
    isLoading: boolean,
    boardgameData: iGameApiData,
    handleCloseForm: () => void,
    handleSaveGame: () => void,
    handleReturnPreviousStep: () => void,
    handleOnChangeFields: (field: string, event: React.ChangeEvent<HTMLInputElement> | string) => void,
};