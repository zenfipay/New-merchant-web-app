"use client"

import * as React from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";
import Divider from "../custom/divider";
import Image from "next/image";
import { CustomCheckbox } from "../custom/CustomCheckbox";
import {ActivityFiltersProps} from '@/types'
import { CustomButton } from "../custom/CustomButton";

export const ActivityLogFilters: React.FC<ActivityFiltersProps> = ({
    filters,
    setFilters,
    uniqueStaff = [],
}) => {
    
    const { date, staff } = filters || { date:"", staff: ""}

    const clearAllFilters = () => {
        setFilters({ date: "", staff: ""})
    };

    const activeFiltersCount = [ date, staff ].filter(Boolean).length;

    const formatFilterLabel = ( label: string ) => label.replace(/(\d+)(hours|days|months)/, "$1 $2");

    const updateFilter = ( key: "date" | "staff" , value: string ) => {
        setFilters((prev) => ({...prev, [key]: value}))
    }

    const dateOptions = React.useMemo(
        () => [
            ["24hours", "Last 24 hours"],
            ["7days", "Last 7 days"],
            ["30days", "Last 30 days"],
            ["3months", "Last 3 months"],
            ["6months", "Last 6 months"],
        ],
        []
    );

    return (
        <div className="flex items-center gap-2">


            {/* DATE FILTERS */}
            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <CustomButton
                            variant="secondary"
                            size="sm"
                            text="Date"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-fit p-3 bg-white">
                        {dateOptions.map(([value, label]) => (
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
                                id={`checkbox-${value}`}
                                checked={date === value}
                                onChange={() => updateFilter("date", value)}
                            />
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {activeFiltersCount > 0 && date && (
                    <div className="bg-[#EEF3FF] flex items-center gap-1 font-normal py-2 px-2.5 rounded-xl">
                        <span>{formatFilterLabel(date)}</span>
                        <button
                            title="close"
                            onClick={() => updateFilter("date", "")}
                        >
                            <Image src="/icons/closeIconBlack.svg" alt="close icon" width={12} height={12} />
                        </button>
                    </div>
                )}
            </div>

            <Divider />

            {/* STAFF FILTERS */}
            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <CustomButton
                            variant="secondary"
                            size="sm"
                            text="Staff"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {uniqueStaff.map((s) => (
                            <DropdownMenuItem   
                                key={s}
                                onClick={() => updateFilter("staff", s)}
                                className={`flex justify-between items-center cursor-pointer data-highlighted:bg-[#EEF3FF] data-highlighted:text-[#014DFF] ${
                                    staff === s ? "bg-[#EEF3FF] text-[#014DFF]" : ""
                                }`}
                            >
                                {s}
                                <CustomCheckbox
                                    id={`checkbox-${s}`}
                                    checked={staff === s}
                                    onChange={() => updateFilter("staff", s)}
                                />
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {activeFiltersCount > 0 && staff && (
                    <div className="bg-[#EEF3FF] flex items-center gap-1 font-normal py-2 px-2.5 rounded-xl">
                        <span>{staff}</span>
                        <button
                            title="close"
                            onClick={() => updateFilter("staff", "")}
                        >
                            <Image src="/icons/closeIconBlack.svg" alt="close icon" width={12} height={12} />
                        </button>
                    </div>
                )}
            </div>

            {activeFiltersCount > 0 ? (
                <button
                onClick={clearAllFilters}
                className="font-normal cursor-pointer underline-grow"
                >
                Reset filters
                </button>
            ): (
                <span className="font-normal text-[#999999]">No filter applied</span>
            )}

        </div>
    )
}