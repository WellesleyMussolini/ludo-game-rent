"use server";

import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { UserProfilePicture } from "@/app/common/components/user-profile-picture/user-profile-picture.component";
import { authOptions } from "../../../(auth)/utils/auth-options";
import { getServerSession, Session } from "next-auth";

export default async function User() {
  const session = (await getServerSession(authOptions as any)) as Session;
  return (
    <div className="flex items-center justify-center min-h-screen pt-24 sm:pt-20">
      {session ? (
        <div className="flex flex-col">
          <div className="flex items-center flex-col bg-white shadow-xl rounded-lg p-6 border border-gray-200">
            <UserProfilePicture />
            <div className="text-center mt-4 break-words">
              <p className="text-lg font-semibold">{session.user.name}</p>
              <p className="text-gray-600">{session.user.email}</p>
            </div>
          </div>

          <p>HISTORICO DE JOGOS COMPRADOS</p>
        </div>
      ) : (
        <ErrorMessage
          title="INICIE UMA SESSÃO"
          message="Conecte-se para visualizar a página do seu perfil"
        />
      )}
    </div>
  );
}
