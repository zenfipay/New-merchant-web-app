import Image from "next/image"

export default function AuthFooter() {
    return (
        <footer className="absolute bottom-5 left-0 right-0 z-20 w-[90%] mx-auto flex flex-row justify-between">
            <Image src="/icons/logo.svg" alt="Zenfipay Logo" width={120} height={200} />
            <p className="font-inter font-medium text-xs text-[#636363]">Copyright &copy; 2025 Zenstar tech.</p>
        </footer>
    )
}