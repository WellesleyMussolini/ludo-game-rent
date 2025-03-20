import { useContext } from "@/app/common/context/context";
import { useUserSession } from "@/app/common/hooks/session.hook";
import { rentalsService } from "@/app/common/services/rentals.service";
// import { telegramService } from "@/app/common/services/telegram-sms.service";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { UserRoles } from "@/app/common/types/user-roles.enum";
import { Session } from "@/app/common/types/user.interface";
import React from "react";
import { toast } from "react-toastify";

export const useCart = () => {
  const { cart, setCart } = useContext();
  const { session } = useUserSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRented, setIsRented] = React.useState<boolean>(false);

  const fullSession: Session = {
    id: session?.user.id ?? "",
    name: session?.user.name ?? "",
    email: session?.user.email ?? "",
    image: session?.user.image ?? "",
    role: (session?.user.role as UserRoles) ?? "",
    expires: session?.expires ?? "",
  };

  const handleRentGame = async () => {
    setIsLoading(true);

    const boardgameNames = cart.boardgames.map(
      (boardgame: BoardGame) => boardgame.name
    );

    try {
      await rentGames();

      const message = `${fullSession.name ?? ""} acabou de alugar!
              
      nome: ${fullSession.name ?? ""}.
      email: ${fullSession.email ?? ""}.
      jogos alugados: "${boardgameNames.join(", ")}".
      `;

      // NEEDS TO BE FIXED
      // await telegramService.sendMessage({ chatId: "-4562845780", message });
      setCart({ ...cart, boardgames: [] });
      toast.success("COMPRA REALIZADA COM SUCESSO");
      setIsRented(true);
    } catch (error) {
      toast.error("Failed to rent games");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const rentGames = async () => {
    for (const boardgame of cart.boardgames) {
      await rentalsService.create({
        userId: session?.user.id ?? "",
        userName: session?.user.name ?? "",
        userEmail: session?.user.email ?? "",
        userImage: session?.user.image ?? "",
        boardgameId: boardgame.id,
        boardgameImage: boardgame.image,
        boardgameName: boardgame.name,
        price: boardgame.price,
        rentalDurationDays: boardgame.rentalDurationDays,
      });
    }
  };

  React.useEffect(() => {
    setIsRented(false);
  }, [setIsRented]);

  return { cart, isLoading, setCart, handleRentGame, isRented };
};
