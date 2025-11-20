"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { CustomButton } from "../custom/CustomButton";
import Divider from "../custom/divider";
import { CustomCheckbox } from "../custom/CustomCheckbox";
import { paymentFiltersProps } from "@/types";

export const PaymentFilterDropdown: React.FC<paymentFiltersProps> = ({
  filters,
  setFilters,
  uniqueTokens,
  uniquePOS,
}) => {

  const { date, token, pos } = filters

  const clearAllFilters = () => {
    setFilters({ date: "", token: "", pos: ""})
  }

  const activeFiltersCount = [ date, token, pos].filter(Boolean).length;

  const formatFilterLabel = (label: string) =>
    label.replace(/(\d+)(hours|days|months)/, "$1 $2");

  const updateFilter = ( key: "date" | "token" | "pos", value: string ) => {
    setFilters((prev) => ({...prev, [key]: value}))
  }

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CustomButton variant="secondary" size="sm" className="flex">
              <Image
                src="/icons/filterIconBlack.svg"
                alt="filter icon"
                width={16}
                height={16}
              />
              Add filter
            </CustomButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {/* DATE FILTER */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] hover:bg-[#EEF3FF] hover:text-[#014DFF]">
                <span>Date</span>
                {date && <span></span>}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent sideOffset={10} alignOffset={-6} className="w-fit p-3 bg-white">
                  {[
                    ["24hours", "Last 24 hours"],
                    ["7days", "Last 7 days"],
                    ["30days", "Last 30 days"],
                    ["3months", "Last 3 months"],
                    ["6months", "Last 6 months"],
                  ].map(([value, label]) => (
                    <DropdownMenuItem
                      key={value}
                      onClick={() => updateFilter("date", value)}
                      className={`flex justify-between items-center cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${
                        date === value
                          ? "bg-[#EEF3FF] text-[#014DFF]"
                          : ""
                      }`}
                    >
                      {label}
                      <CustomCheckbox
                        id={`checkbox-${date}`}
                        checked={date === value}
                        onChange={() => updateFilter("date", value)}
                      />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* POS FILTER */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Point of sale</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent sideOffset={10} alignOffset={-37}>
                  {uniquePOS.map((p) => (
                    <DropdownMenuItem
                      key={p}
                      onClick={() => updateFilter("pos", p)}
                      className={`flex justify-between items-center cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${
                        pos === p ? "bg-[#EEF3FF] text-[#014DFF]" : ""
                      }`}
                    >
                      {p}
                      <CustomCheckbox
                        id={`checkbox-${p}`}
                        checked={pos === p}
                        onChange={() => updateFilter("pos", p)}
                      />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* TOKEN FILTER */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Token</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent sideOffset={10} alignOffset={-68}>
                  {uniqueTokens.map((t) => (
                    <DropdownMenuItem
                      key={token}
                      onClick={() => updateFilter("token", t)}
                      className={`flex justify-between items-center cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${
                        token === t
                          ? "bg-[#EEF3FF] text-[#014DFF]"
                          : ""
                      }`}
                    >
                      {t}
                      <CustomCheckbox
                        id={`checkbox-${t}`}
                        checked={token === t}
                        onChange={() => updateFilter("token", t)}
                      />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>

        <Divider />

        {activeFiltersCount > 0 ? (
          <div className="flex items-center gap-5">
            <div className="bg-[#EEF3FF] font-normal py-2 px-2.5 rounded-xl hover:bg-[#014DFF]/10 transition-all duration-500 ease-in cursor-pointer flex gap-3">
              {date && (
                <span className="inline-flex items-center gap-2">
                  {formatFilterLabel(date)}
                  <button title="close" type="button" onClick={() => updateFilter("date", "")}>
                    <Image
                      src="/icons/closeIconBlack.svg"
                      alt="close icon"
                      width={12}
                      height={12}
                    />
                  </button>
                </span>
              )}
              {token && (
                <span className="inline-flex items-center gap-2">
                  {token}
                  <button title="close" type="button" onClick={() => updateFilter("token", "")}>
                    <Image
                      src="/icons/closeIconBlack.svg"
                      alt="close icon"
                      width={12}
                      height={12}
                    />
                  </button>
                </span>
              )}
              {pos && (
                <span className="inline-flex items-center gap-2">
                  {pos}
                  <button title="close" type="button" onClick={() => updateFilter("pos", "")}>
                    <Image
                      src="/icons/closeIconBlack.svg"
                      alt="close icon"
                      width={12}
                      height={12}
                    />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={clearAllFilters}
              className="font-normal cursor-pointer underline-grow"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <span className="font-normal text-[#999999]">No filter applied</span>
        )}
      </div>
    </div>
  );
};


