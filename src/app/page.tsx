"use server";
import BoardGameCatalogue from "./components/boardgame-catalogue/boardgame-catalogue.component";

export default async function Home() {
  return (
    <div className="flex max-md:justify-center lg:px-28">
      <BoardGameCatalogue />
    </div>
  );
}
