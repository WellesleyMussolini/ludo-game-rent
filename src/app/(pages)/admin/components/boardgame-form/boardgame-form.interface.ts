export interface IBoardGameForm {
    option: string,
    visibility: boolean,

    handleBoardgameOption: (option: string) => void,
    handleVisibility: (visibility: boolean) => void,
    handleSaveGame: () => void,
};

export enum EnumBoardGameFormSteps {
    SEARCH_ID_STEP = "searchId",
    SAVE_GAME_FORM_STEP = "saveGameForm",
};

export enum EnumBoardGameFormAnimation {
    ANIMATION_JUMP_IN = "animate-jump-in",
    ANIMATION_JUMP_OUT = "animate-jump-out",
};