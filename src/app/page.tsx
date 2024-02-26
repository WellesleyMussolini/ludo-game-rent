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
            // componentizar o map
            findAllBoardGames.map((e: any, index: number) => {
              return (
                // componentizar esse card
                <li key={index} className="bg-white max-[350px]:w-[77.14%] w-[270px] h-[316px] rounded-md shadow-md">
                  <div className="relative w-full bg-secondary h-[64%] z-10 leading-5 rounded-t-md">
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10 rounded-t-md"></div>
                    <Image
                      src={e.image}
                      alt={"games"} width={0} height={0}
                      layout='fill'
                      objectFit='cover'
                      className="w-full h-full bg-center object-cover overflow-hidden select-none touch-none" />
                    <p className="absolute bottom-4 left-4 font-black text-xl z-20 text-white shadow-cardName drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{e.name}</p>
                  </div>
                  <div className="relative w-full flex items-start px-4 h-[36%]">
                    {/* format tolocale */}
                    {/* const formatter = new Intl.NumberFormat('en-US', { */}
  {/* style: 'currency', */}
  {/* currency: 'USD', */}

  {/* // These options are needed to round to whole numbers if that's what you want. */}
  {/* //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1) */}
  {/* //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501) */}
{/* }); */}
                    <h5 className="absolute bottom-6 text-2xl font-black text-primary tracking-[.08rem]">R${e.price}</h5> 
                  </div>
                </li>
                // componentizar esse card
              )
            })
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
