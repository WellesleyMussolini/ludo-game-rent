export enum EnumCartSummaryAnimation {
    ANIMATION_SLIDE_IN = "animate-slideInFromRight",
    ANIMATION_SLIDE_OUT = "animate-slideOutToRight"
};

export interface ICartSummary {
    visibility: boolean,
    handleVisibility: (visibility: boolean) => void,
};