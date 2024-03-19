export interface IBoardGameFormStepSaveId {
    isLoading: boolean,
    writeGameId: string,
    handleCloseForm: () => void,
    handleOnChangeId: (writeGameId: string) => void,
    handleNextStep: () => void,
};