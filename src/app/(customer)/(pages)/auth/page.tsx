"use server";

import { Auth as AuthComponent } from "@/app/common/components/auth/auth.component";
import { EnumAuth } from "@/app/common/components/auth/types/auth.types";

export default async function AuthPage() {
  return <AuthComponent type={EnumAuth.AUTH} />;
}
