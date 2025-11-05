"use client"

import { usePathname } from "next/navigation"
import { menuList } from "@/lib/data"
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "../custom/Input";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { CustomButton } from "../custom/CustomButton";

export default function ProfileHeader() {

    const pathname = usePathname();
    const { user } = useUser();

    const allMenuItems = menuList.flatMap((section) => section.items);
    const currentPage = allMenuItems.find((item) => item.href === pathname);
    const pageTitle = currentPage?.title || ""

    const fullName = `${user.firstName} ${user.lastName}` ;

    return (
        <header className="w-full h-fit flex justify-between items-center py-3 px-5 border-b border-[#F5F5F5]">
            <h1 className="font-inter font-semibold text-[15px] text-[#101010] leading-[100%] ">
                {pageTitle}
            </h1>

            <div className="flex justify- gap-3.5">
                <Input type="text" placeholder="Search..." className="w-[205px] h-8 " />
                
                {/* PROFILE SETTINGS */}
                <div className="flex justify-center items-center gap-[7px]">
                    <Avatar className=" bg-[#EEF3FF] w-[30px] h-[30px] rounded-lg p-1.5 border border-green-900">
                        <AvatarFallback className="font-inter font-semibold text-[13px]">{user.initials}</AvatarFallback>
                    </Avatar>
                    {/* NAME & ROLE */}
                    <div className="flex flex-col gap-0.5">
                        <p className="font-inter font-semibold text-[13px] leading-[100%] tracking-normal text-[#101010]">{fullName}</p>
                        <span className="font-inter font-medium text-[11px] leading-[100%] text-[#7D7D7D]">{user.role}</span>
                    </div>
                    {/* DROPDOWN */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="p-1.5 cursor-pointer">
                            <Image src="/icons/ellipsesBlue.svg" alt="more icon" width={16} height={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[236px] border border-[#F6F6F6] drop-shadow-2xl drop-shadow-black">
                            <DropdownMenuItem>
                                <Link href="/" className="w-full flex justify-between items-center">
                                    <p className="">View profile</p>
                                    <Image src="/icons/rarrBlue.svg" alt="go to profile arrow" width={16} height={16} />
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="h-[60px]">
                                <div className="">
                                    <div className="flex flex-col items-center">
                                        <p className="">Device PIN</p>
                                        <p className="">0567</p>
                                    </div>
                                    <CustomButton variant="secondary" type="button">
                                        Copy
                                    </CustomButton>
                                </div>
                                <p className="">
                                    This PIN allows you to log in to any assigned POS device and accept payments securely.
                                </p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}