// import { ReactNode, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Spinner from '../components/custom/ZenfipaySpinner';
// // import { getCurrentUser } from '@/services/axios';

// type Props = {
//     children: ReactNode;
// }

// export default function ProptectedRoutes({ children }: Props) {
//     const router = useRouter();
//     const [ loading, setLoading ] = useState(true);
//     const [ user, setUser ] = useState<any>(null);

//     useEffect(() => {
//         const currentUser = getCurrentUser();
//         if (!currentUser) {
//             router.push('/auth/login')
//         } else {
//             setUser(currentUser);
//         }
//         setLoading(false);
//     }, [router]);

//     if ( loading ) return <Spinner />

//     return <>{user && children}</>
// }

// WRAP DASHBOARD PAGES LIKE THIS
{/* <ProtectedRoutes>
  <DashboardLayout> ... </DashboardLayout>
</ProtectedRoutes> */}
