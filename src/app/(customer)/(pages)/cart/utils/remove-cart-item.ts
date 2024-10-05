import { BoardGame } from "@/app/common/types/boardgame.types";

export const removeCartItem = (
  cart: Array<BoardGame>,
  setCart: React.Dispatch<React.SetStateAction<Array<BoardGame>>>,
  id: string
) => {
  if (id) {
    const updatedCart = cart.filter((item: BoardGame) => item.id !== id);
    setCart(updatedCart);
  }
};
