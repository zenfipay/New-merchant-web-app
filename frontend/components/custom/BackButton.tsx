"use client"

import { useRouter } from "next/navigation";
import { CustomButton } from "./CustomButton";
import Image from "next/image";

export default function BackButton() {
    const router = useRouter()

    return (
        <CustomButton
            onClick={() => router.back()}
            type="button"
            size="sm"
            variant="divider"
            className=""
        >
            <Image src="/images/larr.svg" alt="return arrow button" width={14} height={14} />
        </CustomButton>
    )
}