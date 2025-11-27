import { Toaster } from "@/components/ui/sonner"
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
          <Toaster
                    position="top-right" 
                    richColors 
                    closeButton 
                    toastOptions={{
                        classNames: {
                            toast: "bg-[#E0F3D5] dark:bg-[#E0F3D5] rounded-xl flex items-center justify-start gap-2 font-inter font-medium text-[11px] text-[#101010] border border-[#E0F3D5] drop-shadow-lg",
                            closeButton: "order-last"
                        }
                    }}
                />
        </div>
      </section>
    </main>
  )
}
