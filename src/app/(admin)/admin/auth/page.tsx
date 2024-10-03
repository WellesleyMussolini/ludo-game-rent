"use server";

import { EnumAuth } from "@/app/components/auth/types/auth.types";
import { Auth as AuthComponent } from "../../../components/auth/auth.component";

export default async function Auth() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <AuthComponent type={EnumAuth.ADMIN} />
    </div>
  );
}
