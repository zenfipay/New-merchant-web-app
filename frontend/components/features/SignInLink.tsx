import Link from "next/link";
import Image from "next/image";

export default function AuthSignInLink() {
    return (
        <Link href="/auth" className="h-8 flex flex-row justify-around items-center gap-1 px-3 py-2 font-inter font-semibold text-[13px] outline outline-[#eeeeee] rounded-lg drop-shadow-2xl drop-shadow-[#a4acb9]">
            Sign in
            <Image src="/images/rarr.svg" alt="right arrow icon" width={12} height={12} />
        </Link>
    )
}