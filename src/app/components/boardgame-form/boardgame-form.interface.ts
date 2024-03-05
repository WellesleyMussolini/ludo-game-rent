export interface IBoardGameForm {
    id: string,
    option: string,

    isLoading: boolean,

    handleId: (id: string) => void, 
    handleName: (name: string) => void,
    handleOption: (option: string) => void,
    handlePrice: (price: string) => void,

    visibility: boolean,

    handleVisibility: (visibility: boolean) => void,
    handleSuccessfulAlert: (successfulAlert: boolean) => void,
    handleErrorAlert: (errorAlert: boolean) => void,

    handleGenerateCard: () => void,
};