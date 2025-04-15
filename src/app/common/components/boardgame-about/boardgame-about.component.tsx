"use client";

import React from "react";
import Image from "next/image";
import { ButtonRentGame } from "@/app/common/components/buttons";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { Pathnames } from "../../types/pathnames.enum";
import { usePathname } from "next/navigation";
import { boardGamesService } from "../../services/boardgames.service";
import { useQuery } from "@tanstack/react-query";

export const BoardGameAbout = ({ id }: { id: any }) => {
  const { data: boardgame } = useQuery({
    queryKey: ["boardgame", id],
    queryFn: () => boardGamesService.getById(id),
    enabled: !!id,
    staleTime: 0, // similar to: "keepPreviousData: false"
  });

  const pathname = usePathname();

  if (!boardgame)
    return (
      <div className="flex justify-center items-center  h-screen">
        <ErrorMessage title="404" message="Boardgame não encontrado" />;
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center py-12 pt-28 gap-6 px-20">
      <Image
        src={boardgame?.image ?? ""}
        alt={boardgame?.name ?? ""}
        height={300}
        width={300}
        className="w-56 h-56 object-cover rounded-xl"
      />
      <h1 className="text-5xl font-bold mb-4">{boardgame?.name}</h1>
      {boardgame?.description && (
        <div
          className="text-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: boardgame.description }}
        />
      )}
      <div className={`${pathname !== Pathnames.HOME && "hidden"} w-full`}>
        <ButtonRentGame boardgame={boardgame} />
      </div>
    </div>
  );
};
