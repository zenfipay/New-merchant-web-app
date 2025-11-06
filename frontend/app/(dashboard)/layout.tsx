import Sidebar from "@/components/features/Sidebar"
import ProfileHeader from "@/components/features/ProfileHeader"

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <main className="relative h-screen w-full flex flex-row overflow-hidden">
      
      <aside className="sticky top-0 w-[15%] h-screen">
        <Sidebar />
      </aside>

      <section className="relative w-[85%] bg-white overflow-y-auto">
        <ProfileHeader />
        <div className="pt-4 px-5">
          {children}
        </div>
      </section>
    </main>
  )
}
