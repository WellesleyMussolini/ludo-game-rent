import { IBoardGame } from "@/types/boardgame.interface";

export const removeCartItem = (cart: Array<IBoardGame>, setCart: React.Dispatch<React.SetStateAction<Array<IBoardGame>>>, id: string) => {
    if (id) {  // Ensure id is not undefined
      const updatedCart = cart.filter((item: IBoardGame) => item.id !== id);
      setCart(updatedCart); // Update the cart with the new array
    };
};