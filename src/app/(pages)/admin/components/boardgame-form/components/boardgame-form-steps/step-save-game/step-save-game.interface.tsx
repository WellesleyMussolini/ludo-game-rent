import { ICard } from "@/interfaces/card.interface";

export interface IBoardGameFormStepSaveGame extends ICard {
    isLoading: boolean,
    writeGameName: string,
    boardgameImage: string,
    chooseGameOptions: string,
    handleChooseGameOptions: (chooseGameOptions: string) => void,
    writeGamePrice: string,
    handleCloseForm: () => void,
    handleSaveGame: () => void,
    handleReturnPreviousStep: () => void,
    handleOnChangeFields: (field: string, event: React.ChangeEvent<HTMLInputElement>) => void,
};