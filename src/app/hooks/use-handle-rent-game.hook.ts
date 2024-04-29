"use client"

import { useContext } from "@/context/context";
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { toast } from "react-toastify";

export const useHandleRentGame = (boardgame: IBoardGame | null) => {
    const { cart, setCart } = useContext();
  
    const handleRentGame = async () => {
      if (!boardgame) {
        // Handle the case where boardgame is null
        return; // You can choose to do nothing or log an error
      }
  
      // Check if the boardgame is already in the cart
      const isDuplicated = cart.some((item) => item.id === boardgame.id);
  
      // If it's not a duplicate, add it to the cart
      if (!isDuplicated) {
        await setCart([...cart, boardgame]);
        toast.success(`${boardgame.name} adicionado no carrinho!`);
      } else {
        toast.warn(`${boardgame.name} já adicionado no carrinho.`);
      }
    };
  
    return { handleRentGame };
  };