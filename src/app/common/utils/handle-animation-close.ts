import React from "react";
import { Animations } from "../types/animations.enum";

export const handleAnimationClose = ({
  isVisible,
  setIsVisible,
  setAnimation,
  handleReturnPreviousStep,
}: {
  isVisible: {
    logout: boolean;
    deleteBoardGame: boolean;
    createBoardGame: boolean;
    updateBoardGame: boolean;
    sidebar: boolean;
    dropdown: boolean;
  };
  setIsVisible: React.Dispatch<
    React.SetStateAction<{
      logout: boolean;
      deleteBoardGame: boolean;
      createBoardGame: boolean;
      updateBoardGame: boolean;
      sidebar: boolean;
      dropdown: boolean;
    }>
  >;
  setAnimation: (animation: string) => void;
  handleReturnPreviousStep?: () => void;
}) => {
  setAnimation(Animations.ANIMATION_JUMP_OUT);
  setTimeout(() => {
    setAnimation(Animations.ANIMATION_JUMP_IN);
    if (handleReturnPreviousStep) {
      handleReturnPreviousStep();
    }
    setIsVisible({
      ...isVisible,
      logout: false,
      updateBoardGame: false,
      createBoardGame: false,
      deleteBoardGame: false,
    });
  }, 600);
};
