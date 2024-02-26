// // src/hooks/useAuth.tsx
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';

// export default function useAuth() {
//     const router = useRouter();
//     const { data: session, status } = useSession();

//     if (!router) {
//         throw new Error('Router instance not provided to useAuth');
//     }

//     if (!router.isReady) {
//         return {
//             isAuthenticated: false,
//             isLoading: true,
//             user: null,
//         };
//     }

//     return {
//         isAuthenticated: status === 'authenticated',
//         isLoading: status === 'loading',
//         user: session?.user,
//     };
// }