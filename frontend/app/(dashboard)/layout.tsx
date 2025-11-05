import Sidebar from "@/components/features/Sidebar"
import ProfileHeader from "@/components/features/ProfileHeader"
// import { mockUserData } from "@/lib/data"

export default function DashboardLayout({
    children,
}: { children: React.ReactNode}) {

    // const currentUser = mockUserData[0]

    return (
        <main className="max-h-screen w-full flex flex-row">
            <aside className="W-[15%]">
                <Sidebar />
            </aside>
            <section className="w-[85%] overflow-y-auto">
                <ProfileHeader/>
                {children}
            </section>
        </main>
    )
}