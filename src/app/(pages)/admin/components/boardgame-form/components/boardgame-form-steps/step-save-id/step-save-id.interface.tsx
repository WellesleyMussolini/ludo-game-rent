export interface IBoardGameFormStepSaveId {
    isLoading: boolean,
    writeGameId: string,
    handleCloseForm: () => void,
    handleOnChangeFields: (field: string, event: React.ChangeEvent<HTMLInputElement>) => void,
    handleNextStep: () => void,
};