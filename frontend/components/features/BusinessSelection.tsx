"use client"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,

} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function BusinessSelection() {
    return (
        <div className="h-14 flex justify-center items-center py-3 px-4 gap-3 border-b border-[#F6F6F6]">
          <div className="w-6 h-6 bg-[#20195F] rounded-[4.57px] text-center">
            <span className="inline-block text-green-300 text-sm font-inter font-medium">S</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="h-4 font-inter font-semibold text-[13px] text-[#101010] leading-[100%] tracking-normal">Shoprite mall ikeja</p>
            <span className="h-3 inline-block font-inter font-medium text-[11px] text-[#636363] leading-[100%] tracking-[1.5px]">ID: 656445</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button title="dropdown" type="button" className="bg-[#EEF3FF] w-[21px] h-[21px] rounded-sm p-1.5 cursor-pointer">
                <Image src="/icons/dropdownArr.svg" alt="dropdown trigger" width={8} height={8} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
              <DropdownMenuItem>Dialog o!</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Shoprite mall kini
                <div>
                  Trial plan
                  <br />
                  Free until OCT 1st 2025
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Shoprite mall island</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>MR Biggs Lagos →</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    )
}