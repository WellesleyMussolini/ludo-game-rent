import { authOptions } from "../../../utils/auth-options";
import nextAuth from "next-auth";

const handler = nextAuth(authOptions as any);

export { handler as GET, handler as POST };
