import BoardGameCatalogue from "./components/boardgame-catalogue/boardgame-catalogue.component";

export default async function Home() {
  return <div className="flex flex-col items-center justify-center mt-[120px] h-calc(100vh-80px)]">
    <BoardGameCatalogue />
  </div>
};