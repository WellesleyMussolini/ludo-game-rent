import { Animations } from "../types/animations.enum";

type Props = {
  handleModalVisibility: (visibility: boolean) => void;
  handleAnimation: (animation: Animations) => void;
};

export const handleAnimationCloseModal = ({
  handleModalVisibility,
  handleAnimation,
}: Props) => {
  handleAnimation(Animations.ANIMATION_JUMP_OUT);
  setTimeout(() => {
    handleAnimation(Animations.ANIMATION_JUMP_IN);
    handleModalVisibility(false);
  }, 600);
};
