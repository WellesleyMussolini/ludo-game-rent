import { BoardGame } from "@/app/common/types/boardgame.types";

export const removeCartItem = (
  cart: {
    boardgames: Array<BoardGame>;
    isLoading: boolean;
  },
  setCart: React.Dispatch<
    React.SetStateAction<{
      boardgames: Array<BoardGame>;
      isLoading: boolean;
    }>
  >,
  id: string
) => {
  if (id) {
    const updatedBoardgames = cart.boardgames.filter(
      (item: BoardGame) => item.id !== id
    );
    setCart({ ...cart, boardgames: updatedBoardgames });
  }
};
