"use client";

import React from "react";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { CardStatus } from "../components/card/boardgames/types/card.types";

interface IContext {
  isModalDeleteGameOpen: boolean;
  isModalUpdateGameFormOpen: boolean;
  isModalCreateGameFormOpen: boolean;
  setIsModalUpdateGameFormOpen: (isModalUpdateGameFormOpen: boolean) => void;
  setIsModalCreateGameFormOpen: (isModalCreateGameFormOpen: boolean) => void;
  setIsModalDeleteGameOpen: (isModalDeleteGameOpen: boolean) => void;
  cart: {
    boardgames: Array<BoardGame>;
    isLoading: boolean;
  };
  setCart: React.Dispatch<
    React.SetStateAction<{
      boardgames: Array<BoardGame>;
      isLoading: boolean;
    }>
  >;
  boardgame: BoardGame;
  setBoardGame: React.Dispatch<React.SetStateAction<BoardGame>>;
}

const ContextProvider = React.createContext<IContext | undefined>(undefined);

interface IProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: IProviderProps) => {
  const [cart, setCart] = React.useState<{
    boardgames: Array<BoardGame>;
    isLoading: boolean;
  }>({ boardgames: [], isLoading: true });

  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      // If data exists in localStorage, load it
      setCart({
        boardgames: JSON.parse(savedCart).boardgames,
        isLoading: false,
      });
    } else {
      // If no data, set loading to false and save initial state to localStorage
      setCart({ boardgames: [], isLoading: false });
      localStorage.setItem(
        "cart",
        JSON.stringify({ boardgames: [], isLoading: false })
      );
    }
  }, []);

  // Update localStorage whenever boardgames array in cart changes
  React.useEffect(() => {
    if (!cart.isLoading) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart.boardgames, cart]);

  const [boardgame, setBoardGame] = React.useState<BoardGame>({
    id: "",
    name: "",
    image: "",
    price: "",
    status: CardStatus.AVAILABLE,
    ageToPlay: "",
    playTime: "",
    minimumPlayersToPlay: "",
    maximumPlayersToPlay: "",
    description: "",
    rentalDurationDays: "",
    availableCopies: "",
  });

  const [isModalUpdateGameFormOpen, setIsModalUpdateGameFormOpen] =
    React.useState<boolean>(false);
  const [isModalCreateGameFormOpen, setIsModalCreateGameFormOpen] =
    React.useState<boolean>(false);
  const [isModalDeleteGameOpen, setIsModalDeleteGameOpen] =
    React.useState<boolean>(false);

  return (
    <ContextProvider.Provider
      value={{
        cart,
        boardgame,
        isModalUpdateGameFormOpen,
        isModalCreateGameFormOpen,
        isModalDeleteGameOpen,
        setCart,
        setBoardGame,
        setIsModalUpdateGameFormOpen,
        setIsModalCreateGameFormOpen,
        setIsModalDeleteGameOpen,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export const useContext = (): IContext => {
  const context = React.useContext(ContextProvider);
  if (!context) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  return context;
};
