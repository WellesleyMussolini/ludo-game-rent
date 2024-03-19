import {ICard} from "../../../../../../interfaces/card.interface";

export interface IBoardGameFormStepTwo extends ICard {
    isLoading: boolean,
    writeGameName: string,
    handleWriteGameName: (writeGameName: string) => void,
    chooseGameOptions: string,
    handleChooseGameOptions: (chooseGameOptions: string) => void,
    writeGamePrice: string,
    handleWriteGamePrice: (writeGamePrice: string) => void,
    handleCloseForm: () => void,
    handleSaveGameInDB: () => void,
    handleReturnPreviousStep: () => void,
};