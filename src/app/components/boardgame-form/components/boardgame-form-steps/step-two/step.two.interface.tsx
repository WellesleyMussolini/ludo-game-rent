import {ICard} from "../../../../../../interfaces/card.interface";


export interface IBoardGameFormStepTwo extends ICard {
    writeGameName: string,
    handleWriteGameName: (writeGameName: string) => void,
    chooseGameOptions: string,
    handleChooseGameOptions: (chooseGameOptions: string) => void,
    writeGamePrice: string,
    handleWriteGamePrice: (writeGamePrice: string) => void,
    handleCloseForm: () => void,
    handleNextStep: () => void,
    handleReturnPreviousStep: () => void,
};