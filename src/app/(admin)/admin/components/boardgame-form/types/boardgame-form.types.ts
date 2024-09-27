export interface IBoardGameStepForm {
    visibility: boolean,
    handleVisibility: (visibility: boolean) => void
};

export enum BoardGameFormSteps {
    SEARCH_ID_STEP = "searchId",
    SAVE_GAME_FORM_STEP = "saveGameForm",
};

export enum BoardGameFormAnimation {
    ANIMATION_JUMP_IN = "animate-jump-in",
    ANIMATION_JUMP_OUT = "animate-jump-out",
};