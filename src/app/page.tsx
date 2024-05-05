"use server";
import BoardGameCatalogue from "./components/boardgame-catalogue/boardgame-catalogue.component";
import { Header } from "./layout/header/header.layout";

export default async function Home() {
  return (
    <>
      <Header />
      <div className="flex max-md:justify-center lg:px-28">
        <BoardGameCatalogue />
      </div>
    </>
  );
}
