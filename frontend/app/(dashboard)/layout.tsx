import Sidebar from "@/components/custom/Sidebar"

export default function DashboardLayout({
    children,
}: { children: React.ReactNode}) {

    return (
        <main className="max-h-screen w-full flex flex-row">
            <aside className="W-[15%]">
                <Sidebar />
            </aside>
            <section className="w-[85%] overflow-y-auto">
                {children}
            </section>
        </main>
    )
}