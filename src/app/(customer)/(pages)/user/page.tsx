"use server";

import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { UserProfilePicture } from "@/app/common/components/user-profile-picture/user-profile-picture.component";
import { authOptions } from "../../../(auth)/utils/auth-options";
import { getServerSession, Session } from "next-auth";
import { SessionRentalHistory } from "@/app/common/components/session-rental-history/session-rental-history.component";

export default async function User() {
  const session = (await getServerSession(authOptions as any)) as Session;
  return (
    <div className="flex items-center justify-center min-h-screen pt-24 sm:pt-20">
      {session ? (
        <div className="flex justify-center items-center flex-col w-full sm:px-10">
          <div className="max-[200px]:w-[90%] max-w-72 flex items-center flex-col bg-white shadow-xl rounded-lg p-6 border border-gray-200">
            <UserProfilePicture />
            <div className="text-center mt-4 break-words">
              <p
                className="
                text-[clamp(10px,2.5vw+0.5rem,1.25rem)]
                font-semibold 
                "
              >
                {session.user.name}
              </p>
              <p
                className="
                text-[clamp(10px,2.5vw+0.5rem,1.25rem)]
                text-gray-600
              "
              >
                {session.user.email}
              </p>
            </div>
          </div>

          <SessionRentalHistory />
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
