import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import BoardGameCatalogue from "./components/boardgame-catalogue/boardgame-catalogue.component";

async function Home() {
  // const session = await getServerSession(authOptions); // will get the session of the user logged

  return <div className="flex flex-col items-center justify-center py-20" style={{ minHeight: 'calc(100vh - 80px)' }}>
    <BoardGameCatalogue />
  </div>
};

export default Home;