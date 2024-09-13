### Tarefas Pendentes

- Verificar classes repetidas e passar para o globals.css

### BUGS

- Deslogar da conta está causando error.

- Quando a tela do projeto atinge 640 píxels o header não vai para 100% o seu tamanho, o ícone não aparece nessa resolução. O bug não acontece nas resoluções a partir de 639 píxels para baixo e 641 píxels para cima, apenas em 640 píxels.

- tratar a responsividade do formulario de criar jogos.

- A sidebar está apenas oculta na rota de login da ADMIN. Se eu não estiver autenticado e tentar acessar apenas a rota "/admin" eu consigo visualizar a sidebar piscando.

- Ao adicionar um cargo ( role ) aos usuários a informação atualiza instantaneamente no banco de dados, porém leva um tempo para atualizar no site.

### Código Personalizado da Home

```javascript
// const session = await getServerSession(authOptions);
// const findAllUsers = await prisma.user.findMany({ orderBy: { id: "desc" } });

// if(!session || !session.user) return redirect("/");
```

### auth-options code

```javascript
// const { default: NextAuth } = require("next-auth/next");
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { Adapter } from "next-auth/adapters";
// import GoogleProvider from "next-auth/providers/google";
// import { prisma } from "@/utils/lib/database/prisma";
// import { Session } from "next-auth";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     session: async ({ user }: Session) => {
//       if (user) {
//       }
//       return {
//         user: {
//           ...user,
//         },
//       };
//     },
//   },
// };
```

### This code bellow is working in the middleware to get the user session

```javascript
// auth-options code
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../utils/lib/database/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt", // This enables JWT-based session
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // Attach user roles and other info to the token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ user, session, token }: any) {
      session.user.role = token.role;
      return {
        user: {
          ...user,
          expires: session.expires,
        }
      }
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};
```


```javascript
// middleware
"use server"

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Use getToken to retrieve the JWT token from the request
  const token = await getToken({ req: request, secret: process.env.NEXT_PUBLIC_SECRET });
  console.log("token", token)

  // console.log("token", token);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/admin/:path*",
  ],
};
```