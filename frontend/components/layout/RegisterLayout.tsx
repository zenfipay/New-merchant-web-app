import { Toaster } from '@/components/ui/sonner';
import AuthFooter from '@/app/auth/components/AuthFooter';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="hidden min-h-screen lg:flex flex-col p-8 justify-between">
            {children}
            <Toaster
                position="top-right" 
                richColors 
                closeButton 
                toastOptions={{
                    classNames: {
                        toast: "bg-[#E0F3D5] rounded-xl flex items-center justify-start gap-2 font-inter font-medium text-[11px] text-[#101010] border border-[#E0F3D5] drop-shadow-lg",
                        closeButton: "order-last"
                    }
                }}
            />
            <AuthFooter />
        </section>
    )
}