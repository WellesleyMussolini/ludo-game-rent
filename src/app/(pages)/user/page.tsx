"use server"

import { ErrorMessage } from "@/app/components/error-message/error-message.component";
import { UserProfilePicture } from "@/app/components/user-profile-picture/user-profile-picture.component";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function User() {
    const session = await getServerSession(authOptions);
    return <div className="flex items-center justify-center min-h-screen pt-24 sm:pt-20">
        {
            session ?
            <>
                <div className="flex items-center flex-col bg-white shadow-xl rounded-lg p-6 border border-gray-200">
                    <UserProfilePicture size={"100"} />
                    <div className="text-center mt-4 break-words">
                        <p className="text-lg font-semibold">{session.user.name}</p>
                        <p className="text-gray-600">{session.user.email}</p>
                    </div>
                </div>
            </>
                :
                <ErrorMessage title="INICIE UMA SESSÃO" message="Conecte-se para visualizar a página do seu perfil" />
        }
    </div>
};