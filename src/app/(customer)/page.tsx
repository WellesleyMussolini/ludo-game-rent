import { BoardGameCatalogue } from "../common/components/boardgame-catalogue/boardgame-catalogue.component";

export default async function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <BoardGameCatalogue />
    </div>
  );
}
