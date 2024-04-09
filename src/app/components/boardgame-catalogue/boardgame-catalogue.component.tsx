"use server";

import { prisma } from "@/utils/lib/database/prisma";
import { Card } from "../card/card.component";
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { ErrorMessage } from "../error-message/error-message.component";

interface IBoardGameData extends IBoardGame { id: string };

// export default async function BoardGameCatalogue() {
//     const findAllBoardGames = await prisma.boardgames.findMany({ orderBy: { id: "desc" } });
//     if(!findAllBoardGames) return <ErrorMessage title="404" message="Oops! Por algum motivo não foi possível encontrar o catálogo de jogos..." />
//     return (
//         <ul className="grid justify-items-center gap-10
//         grid-cols-4 
//         max-[1300px]:grid-cols-3 
//         max-[1000px]:grid-cols-2 
//         max-[730px]:grid-cols-1 
//         max-[350px]:w-full
//         "
//         >
//             {findAllBoardGames.map((boardgame: IBoardGameData, index: number) => (
//                 <Card
//                     key={index}
//                     boardgame={boardgame}
//                 />
//             ))}
//         </ul>
//     );
// };
export default async function BoardGameCatalogue() {
    try {
        const findAllBoardGames = await prisma.boardgames.findMany({ orderBy: { id: "desc" } });
        return (
            <ul className="grid justify-items-center gap-10
            grid-cols-4 
            max-[1300px]:grid-cols-3 
            max-[1000px]:grid-cols-2 
            max-[730px]:grid-cols-1 
            max-[350px]:w-full
            "
            >
                {findAllBoardGames.map((boardgame: IBoardGameData, index: number) => (
                    <Card
                        key={index}
                        boardgame={boardgame}
                    />
                ))}
            </ul>
        );
    } catch {
        return <ErrorMessage title="404" message="Oops! Por algum motivo não foi possível encontrar o catálogo de jogos..." />;
    }
};