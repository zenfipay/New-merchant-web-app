'use client'

import { useUser } from "@/context/UserContext"

export default function UserInitials() {

    const { user } = useUser();
    const firstLetterOfFirstName = user.firstName.charAt(0);
    const firstLetterOfLastName = user.lastName.charAt(0);

    return (
        <span className="flex font-semibold text-[#20195F]">
            <span className=''>{firstLetterOfFirstName}</span>
            <span>{firstLetterOfLastName}</span>
        </span>
    )
}