"use server";

import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { authOptions } from "../../../(auth)/utils/auth-options";
import { getServerSession, Session } from "next-auth";
import { UserOverview } from "./components/UserOverview.component";

export default async function User() {
  const session = (await getServerSession(authOptions as any)) as Session;
  return (
    <div className="flex items-center justify-center min-h-screen pt-24 sm:pt-20">
      {session ? (
        <UserOverview />
      ) : (
        <ErrorMessage
          title="INICIE UMA SESSÃO"
          message="Conecte-se para visualizar a página do seu perfil"
        />
      )}
    </div>
  );
}
