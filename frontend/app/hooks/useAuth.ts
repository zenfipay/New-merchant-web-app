// // src/hooks/useAuth.ts
// import { Role, Permission, rolePermissions } from '@/types/roles';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export function useAuth(role: Role, permission?: Permission) {
//   const router = useRouter();
//   const user = getCurrentUser(); // From context or JWT

//   useEffect(() => {
//     if (!user) router.push('/auth/login');
//     else if (role && user.role !== role) router.push('/dashboard/not-authorized');
//     else if (permission && !rolePermissions[user.role].includes(permission)) {
//       router.push('/dashboard/not-authorized');
//     }
//   }, [user]);
// }
