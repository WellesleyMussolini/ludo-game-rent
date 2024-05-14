"use server";

import React from "react";
import BoardGameInfo from "./components/BoardgamesInfo/BoardgamesInfo";

export default async function BoardGame({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="flex max-md:justify-center h-screen dark:bg-zinc-800">
      <BoardGameInfo id={id} />
    </div>
  );
}
