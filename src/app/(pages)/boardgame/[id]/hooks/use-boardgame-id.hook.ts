import { useContext } from "@/context/context";
import { IBoardGame } from "@/interfaces/boardgame.interface";

export const useBoardgameId = (boardgame: IBoardGame) => {
  const { cart, setCart } = useContext();

  const handleRentGame = async (event: React.MouseEvent<HTMLElement>) => {
    // Check if the boardgame is already in the cart
    const isDuplicated = cart.some((item) => item.id === boardgame.id);

    // If it's not a duplicate, add it to the cart
    if (!isDuplicated) return await setCart([...cart, boardgame]);

    // Prevent the default behavior of the button click
    event.preventDefault();
    event.stopPropagation();
  };

  return { handleRentGame };
};
