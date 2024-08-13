"use server"

import { Auth as AuthComponent } from "../../../components/auth/auth.component";
import { EnumAuth } from "../../../components/auth/types/auth.types";

export default async function AuthPage() {
    return <AuthComponent type={EnumAuth.AUTH} />;
};