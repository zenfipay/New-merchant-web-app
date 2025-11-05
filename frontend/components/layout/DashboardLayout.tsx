import Sidebar from "../features/Sidebar"

export default function DashboardLayout({
    children,
}: { children: React.ReactNode}) {

    return (
        <main className="w-full flex flex-row">
            <aside className="W-[15%]">
                <Sidebar />
            </aside>
            <section className="w-[85%]">
                {children}
            </section>
        </main>
    )
}