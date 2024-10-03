import { BoardGame } from "@/app/common/types/boardgame.types";

export const removeCartItem = (
  cart: Array<BoardGame>,
  setCart: React.Dispatch<React.SetStateAction<Array<BoardGame>>>,
  id: string
) => {
  if (id) {
    // Ensure id is not undefined
    const updatedCart = cart.filter((item: BoardGame) => item.id !== id);
    setCart(updatedCart); // Update the cart with the new array
  }
};
