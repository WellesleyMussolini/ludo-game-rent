import { ICard } from "@/interfaces/card.interface";

export interface IBoardGameFormStepSaveGame extends ICard {
    isLoading: boolean,
    writeGameName: string,
    boardgameImage: string,
    chooseGameStatus: string,
    writeGamePrice: string,
    handleCloseForm: () => void,
    handleSaveGame: () => void,
    handleReturnPreviousStep: () => void,
    handleOnChangeFields: (field: string, event: React.ChangeEvent<HTMLInputElement> | string) => void,
};