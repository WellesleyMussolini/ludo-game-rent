"use server";

import BoardGameCatalogue from "../components/boardgame-catalogue/boardgame-catalogue.component";

export default async function Home() {
  return <BoardGameCatalogue />
};