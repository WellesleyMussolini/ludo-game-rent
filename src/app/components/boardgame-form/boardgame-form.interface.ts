export interface IBoardGameForm {
    id: string,
    option: string,
    image: string,
    imageName: string,
    gameName: string,
    gamePrice: string,
    isLoading: boolean,
    visibility: boolean,

    handleId: (id: string) => void,
    handleName: (name: string) => void,
    handleOption: (option: string) => void,
    handlePrice: (price: string) => void,

    handleVisibility: (visibility: boolean) => void,
    handleSuccessfulAlert: (successfulAlert: boolean) => void,
    handleErrorAlert: (errorAlert: boolean) => void,

    handleGenerateCard: () => void,
};

export enum EnumBoardGameFormSteps {
    SEARCH_ID_STEP = "searchId",
    SAVE_GAME_FORM_STEP = "saveGameForm",
};

export enum EnumBoardGameFormAnimation {
    ANIMATION_JUMP_IN = "animate-jump-in",
    ANIMATION_JUMP_OUT = "animate-jump-out",
}