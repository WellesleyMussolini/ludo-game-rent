"use server";
import BoardGameCatalogue from "./components/boardgame-catalogue/boardgame-catalogue.component";

export default async function Home() {
  return (
    <div className="flex px-8 max-md:justify-center lg:px-28 py-8">
      <BoardGameCatalogue />
    </div>
  );
}
