"use client"

import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { CustomButton } from "../custom/CustomButton"
import Divider from "../custom/divider"
import { CustomCheckbox } from "../custom/CustomCheckbox"
import { accountFilterProps } from "@/types"

export const AccountFilterDropdown: React.FC<accountFilterProps> = ({
    filters,
    setFilters,
    uniqueAccounts,
    uniqueTypes,
}) => {

    const { date, account, type } = filters

    const clearAllFilters = () => {
        setFilters({ date: "", account: "", type: ""})
    };

    const activeFiltersCount = [ date, account, type ].filter(Boolean).length;

    const formatFilterLabel = ( label: string ) => label.replace(/(\d+)(hours|days|months)/, "$1 $2");

    const updateFilter = ( key: "date" | "account" | "type", value: string ) => {
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

                        {/* ACCOUNT FILTER */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Account
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent sideOffset={10} alignOffset={-37} >
                                    {uniqueAccounts.map((a) => (
                                        <DropdownMenuItem
                                            key={a}
                                            onClick={() => updateFilter("account", a)}
                                        >
                                            {a}
                                            <CustomCheckbox
                                                id={`checkbox-${a}`}
                                                checked={account === a}
                                                onChange={() => updateFilter("account", a)}
                                            />
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>

                        {/* TYPE FILTER */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Type
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent sideOffset={10} alignOffset={-68}>
                                    {uniqueTypes.map((t) => (
                                        <DropdownMenuItem
                                            key={t}
                                            onClick={() => updateFilter("type", t)}
                                            className={`flex justify-between items-center cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${
                                                type === t
                                                ? "bg-[#EEF3FF] text-[#014DFF]"
                                                : ""
                                            }`}
                                        >
                                            {t}
                                            <CustomCheckbox
                                                id={`checkbox-${type}`}
                                                checked={type === t}
                                                onChange={() => updateFilter("type", t)}
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
                            {account && (
                            <span className="inline-flex items-center gap-2">
                                {account}
                                <button title="close" type="button" onClick={() => updateFilter("account", "")}>
                                <Image
                                    src="/icons/closeIconBlack.svg"
                                    alt="close icon"
                                    width={12}
                                    height={12}
                                />
                                </button>
                            </span>
                            )}
                            {type && (
                            <span className="inline-flex items-center gap-2">
                                {type}
                                <button title="close" type="button" onClick={() => updateFilter("type", "")}>
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
                ): (
                    <span className="font-normal text-[#999999]">No filter applied</span>
                )}
            </div>
        </div>
    )
}