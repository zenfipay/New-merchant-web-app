import Link from "next/link";
import Image from "next/image";

export default function AuthSignInLink() {
    return (
        <Link href="/auth" className="w-20 h-8 flex flex-row justify-center items-center gap-1 px-3 py-2 font-inter font-semibold text-[13px] outline outline-[#eeeeee] rounded-lg drop-shadow-2xl drop-shadow-[#a4acb9] leading-[100%]">
            Sign in
            <Image src="/icons/rarr.svg" alt="right arrow icon" width={12} height={12} />
        </Link>
    )
}