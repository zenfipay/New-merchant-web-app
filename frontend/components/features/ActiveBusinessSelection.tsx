"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,

} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"

import Link from "next/link"
import { CustomButton } from "../custom/CustomButton"
import Image from "next/image"
import ROUTES from "@/routes"

const branchData = [
  {
    title: "Add new branch",
    href: ROUTES.ADD_BRANCH,
  },
  {
    title: "Ikeja branch",
    href: "/",
  },
  {
    title: "Ikoji branch",
    href: "/",
  },
]

const businessData = [
  {
    title: "Add new business",
    href: ROUTES.ADD_BUSINESS,
  },
  {
    title: "MR Biggs'",
    href: "/",
  },
  {
    title: "Jendol Superstore",
    href: "/",
  },
]

export default function DialogSelection() {
  return (
    <div className="flex justify-center items-center gap-[9px] py-3 px-4 border-b border-[#F6F6F6]">
        <Avatar className="bg-[#20195F] w-6 h-6 flex items-center rounded-[4.75px]">
          <AvatarFallback className="w-2 h-5 mx-auto font-semibold text-[#99EC64] text-[13px]">S</AvatarFallback>
        </Avatar>

        {/* BUSINESS NAME AND ID */}
        <div className="">
          <p className="font-semibold text-[13px] leading-[100%] tracking-normal text-[#101010]">Shoprite mall ikeja</p>
          <span className="text-[11px] leading-[100%] tracking-[1.4px] text-[#636363]">ID: 656445</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="" asChild>
              <CustomButton
                variant="divider"
                size="sm"
                className="w-5 h-5 p-1.5 rounded-[3px] bg-[#EEF3FF] outline-none ring-2 ring-[#CDDCFF]"
              >
                <Image src="/icons/darrBlue.svg" alt="dropdown icon for business info" width={12} height={12} />
              </CustomButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
                <div className="flex flex-col justify-start items-center space-y-2 p-1 rounded-lg">
                    <div className="w-full flex items-center gap-[9px] py-1.5 px-2">
                      <Avatar className="bg-[#20195F] w-6 h-6 text-center rounded-[4.75px]">
                        <AvatarFallback className=" font-inter font-semibold text-green-400 text-[13px]">S</AvatarFallback>
                      </Avatar>
                      <p className="text-[13px]">Shoprite mall ikeja</p>
                    </div>
                    <div className="bg-[#EEF3FF] w-full flex justify-between items-center gap-x-2.5 py-2.5 px-3 rounded-lg">
                      {/* TRIAL PLAN INFO */}
                      <div className="">
                        <p className="">Trial plan</p>
                        <span className="font-normal text-[11px] text-[#636363]">Free until Oct. 1st 2025</span>
                      </div>

                      {/* PLAN UPGRADE BUTTON */}
                      <CustomButton
                        variant="secondaryBrand"
                        size="sm"
                        text="Upgrade"
                      />
                    </div>
                </div>
              <DropdownMenuSeparator />

              {/* DROPDOWN FOR SWITCHING BRANCHES */}
              <DropdownMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex justify-between items-center py-2 px-1 cursor-pointer">
                      Switch branch
                      <Image src="/icons/rarrBlue.svg" alt="arrow to show branch options" width={14} height={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    align="start"
                    alignOffset={8}
                    className="w-[236px] h-fit"
                  >
                    {branchData.map((branch) => (
                      <DropdownMenuItem key={branch.title} className="w-full rounded-none px-0 border-b last:border-0">
                        {branch.title === "Add new branch" ? (
                          <Link href={branch.href}>
                            <div className="w-full flex items-center gap-1 py-1 px-1">
                              <Image src="/icons/addIconBlue.svg" alt="add icon" width={14} height={14} />
                              {branch.title}
                            </div>
                          </Link>
                        ): (
                          <div className="w-full flex justify-between items-center py-1 px-1">
                            <p className="">{branch.title}</p>
                            <Image src="/icons/rarrBlue.svg" alt={`link to go to ${branch.title}`} width={14} height={14} />
                          </div>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* DROPDOWN FOR SWITCHING BUSINESSES */}
              <DropdownMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex justify-between items-center py-2 px-1 cursor-pointer">
                      Switch businesses
                      <Image src="/icons/rarrBlue.svg" alt="arrow to show branch options" width={14} height={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    align="start"
                    sideOffset={8}
                    className="w-[236px]"
                  >
                    {businessData.map((business) => (
                      <DropdownMenuItem key={business.title} className="w-full rounded-none px-0 border-b last:border-0">
                        {business.title === "Add new business" ? (
                          <Link href={business.href}>
                            <div className="w-full flex items-center gap-1 py-1 px-1">
                              <Image src="/icons/addIconBlue.svg" alt="add icon" width={14} height={14} />
                              {business.title}
                            </div>
                          </Link>
                        ): (
                          <div className="w-full flex justify-between items-center py-1 px-1">
                            <p className="">{business.title}</p>
                            <Image src="/icons/rarrBlue.svg" alt={`link to go to ${business.title}`} width={14} height={14} />
                          </div>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}