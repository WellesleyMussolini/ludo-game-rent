export interface IBoardGameForm {
    boardgameId: string,
    option: string,
    image: string,
    imageName: string,
    gameName: string,
    gamePrice: string,
    isLoading: boolean,
    visibility: boolean,

    handleBoardgameId: (id: string) => void,
    handleBoardgameName: (name: string) => void,
    handleBoardgameOption: (option: string) => void,
    handleBoardgamePrice: (price: string) => void,

    handleVisibility: (visibility: boolean) => void,

    handleGenerateCard: () => void,
    handleSaveGameInDB: () => void,
};

export enum EnumBoardGameFormSteps {
    SEARCH_ID_STEP = "searchId",
    SAVE_GAME_FORM_STEP = "saveGameForm",
};

export enum EnumBoardGameFormAnimation {
    ANIMATION_JUMP_IN = "animate-jump-in",
    ANIMATION_JUMP_OUT = "animate-jump-out",
};