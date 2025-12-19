import { Toaster } from '@/components/ui/sonner';
import AuthFooter from '../features/authComponents/AuthFooter';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="relative hidden min-h-screen lg:flex flex-col justify-between">
            <div className='px-8 py-6 '>
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
            <AuthFooter />
        </section>
    )
}