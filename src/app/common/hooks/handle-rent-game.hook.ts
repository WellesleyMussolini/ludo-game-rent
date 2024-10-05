"use client";

import { useContext } from "@/app/common/context/context";
import { toast } from "react-toastify";
import { BoardGame } from "../types/boardgame.types";

export const useHandleRentGame = (boardgame: BoardGame | null) => {
  const { cart, setCart } = useContext();

  const handleRentGame = async (event: any) => {
    event.stopPropagation();

    if (!boardgame) return;

    const isGameInCart = cart.some((item) => item.id === boardgame.id);

    if (isGameInCart) {
      toast.warn(` ${boardgame.name} is already in your cart`);
      return;
    }

    setCart([...cart, boardgame]);
    toast.success(`${boardgame.name} added to your cart`);
  };

  return { handleRentGame };
};
