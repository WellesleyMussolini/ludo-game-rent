export interface IBoardGameFormStepSaveId {
    isLoading: boolean,
    writeGameId: string,
    handleCloseForm: () => void,
    handleOnChangeFields: (field: string, value: string) => void, // Change the type of the second argument
    handleNextStep: () => void,
};