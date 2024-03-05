"use server"

import { prisma } from "@/utils/lib/database/prisma";
import { Card } from "./components/card/card.component";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Header } from "./layout/header/header.layout";
import { EnumHeader } from "./layout/header/header.interface";

async function Home() {
  const findAllBoardGames = await prisma.boardgame.findMany({
    orderBy: {
      id: "desc",
    },
  });

  // const session = await getServerSession(authOptions); // will get the session of the user logged


  return (
    <>
      <div className="flex flex-col items-center justify-center py-20" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <ul className="grid justify-items-center max-[1300px]:grid-cols-3 max-[1000px]:grid-cols-2 max-[730px]:grid-cols-1 grid-cols-4 gap-10 max-[350px]:w-full">
          {
            findAllBoardGames.map((e: any, index: number) => <Card key={index} image={e.image} name={e.name} price={e.price} />)
          }
        </ul>
      </div>
    </>
  );
};

export default Home;

// SMALL SCREENS OPTIONS
{/* <div className="relative flex rounded h-72 w-52"> */ }
{/* <Card image={e.image} /> */ }
{/* </div> */ }
