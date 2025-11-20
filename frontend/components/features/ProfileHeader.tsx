"use client"
import * as React from 'react'

import { usePathname } from "next/navigation"
import { menuList } from "@/lib/data"
import { useUser } from "@/context/UserContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "../custom/Input"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { CustomButton } from "../custom/CustomButton"
import SearchBar from "../custom/SearchBar"

export default function ProfileHeader() {
  const pathname = usePathname()
  const { user } = useUser()

  const [ searchTerm, setSearchTerm ] = React.useState('')
  const allMenuItems = menuList.flatMap((section) => section.items)
  const currentPage = allMenuItems.find((item) => item.href === pathname)
  const pageTitle = currentPage?.title || ""
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <header className="sticky top-0 w-full flex justify-between items-center py-3 px-5 border-b border-[#F5F5F5] bg-white z-50 shadow-bottom">
      <h1 className="font-inter font-semibold text-[15px] text-[#101010] leading-[100%]">
        {pageTitle}
      </h1>

      <div className="flex items-center gap-3.5">
        {/* Optional search input */}
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center gap-2">

          <Avatar className="bg-[#EEF3FF] w-[30px] h-[30px] rounded-md p-1.5 ring ring-[#CDDCFF] flex items-center justify-center">
            <AvatarFallback className="font-inter font-semibold text-[13px] text-[#20195F]">
              EA
            </AvatarFallback>
          </Avatar>

          {/* NAME AND ROLE */}
          <div className="flex flex-col leading-tight">
            <p className="font-inter font-semibold text-[13px] text-[#101010]">
              {fullName}
            </p>
            <span className="font-inter font-medium text-[11px] text-[#7D7D7D]">
              {user.role}
            </span>
          </div>

          {/* DROPDOWN MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1.5 cursor-pointer">
              <Image
                src="/icons/ellipsesBlue.svg"
                alt="more icon"
                width={16}
                height={16}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[236px] border border-[#F6F6F6] shadow-xl">
              <DropdownMenuItem>
                <Link
                  href="/"
                  className="w-full flex justify-between items-center"
                >
                  <p>View profile</p>
                  <Image
                    src="/icons/rarrBlue.svg"
                    alt="go to profile arrow"
                    width={16}
                    height={16}
                  />
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex flex-col items-start gap-2 py-3">
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-medium text-[#101010]">
                      Device PIN
                    </p>
                    <p className="text-[13px] font-semibold">0567</p>
                  </div>
                  <CustomButton variant="secondary" type="button">
                    Copy
                  </CustomButton>
                </div>

                <p className="text-xs text-[#7D7D7D] leading-snug">
                  This PIN allows you to log in to any assigned POS device and
                  accept payments securely.
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
