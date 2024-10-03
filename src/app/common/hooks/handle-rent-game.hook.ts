"use client";

import { useContext } from "@/app/common/context/context";
import { toast } from "react-toastify";
import { BoardGame } from "../types/boardgame.types";

export const useHandleRentGame = (boardgame: BoardGame | null) => {
  const { cart, setCart } = useContext();

  const handleRentGame = async () => {
    // Handle the case where boardgame is null
    if (!boardgame) return;

    // Check if the boardgame is already in the cart
    const isDuplicated = cart.some((item) => item.id === boardgame.id);

    // If it's not duplicated then it'll add to the cart
    if (!isDuplicated) {
      setCart([...cart, boardgame]);
      toast.success(`${boardgame.name} adicionado no carrinho!`);
    } else {
      toast.warn(`${boardgame.name} já adicionado no carrinho.`);
    }
  };

  return { handleRentGame };
};
