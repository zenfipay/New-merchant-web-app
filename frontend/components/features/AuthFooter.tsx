import Image from "next/image"

export default function AuthFooter() {
    return (
        <footer className="w-full flex flex-row justify-between">
            <Image src="/icons/logo.svg" alt="Zenfipay Logo" width={120} height={200} />
            <p className="font-inter font-medium text-xs text-[#636363]">Copyright &copy; 2025 Zenstar tech.</p>
        </footer>
    )
}