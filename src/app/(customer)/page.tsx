"use server";

import { BoardGameCatalogue } from "../common/components/boardgame-catalogue/boardgame-catalogue.component";
import { BoardGameAbout } from "../common/components/boardgame-about/boardgame-about.component";

type HomeProps = {
  searchParams: { boardgame?: string | undefined };
};

export default async function Home({ searchParams }: HomeProps) {
  const boardgameId: string | undefined = searchParams.boardgame ?? undefined;

  if (boardgameId) return <BoardGameAbout id={boardgameId} />;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <BoardGameCatalogue />
    </div>
  );
}
