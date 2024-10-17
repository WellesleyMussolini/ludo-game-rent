import { Session } from "../types/user.interface";

export const notificationService = {
  sendRentalNotification: async (
    user: Session,
    boardgameNames: Array<string>
  ) => {
    const message = `${user.name ?? ""} acabou de alugar!
              
          nome: ${user.name ?? ""}.
          email: ${user.email ?? ""}.
          jogos alugados: "${boardgameNames.join(", ")}".
          `;

    await fetch("common/services/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ message }),
    });
  },
};
