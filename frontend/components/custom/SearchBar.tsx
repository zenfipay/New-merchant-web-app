"use client"

import * as React from 'react'
import Image from "next/image"
import { SearchBarProps } from '@/types'

export default function  SearchBar({ value, onChange, placeholder}: SearchBarProps) {
    return (
        <div className="relative w-[205px] h-8 flex items-center gap-1 p-1.5 rounded-lg ring ring-[#EEEEEE]">
            <Image src="/icons/searchIcon.svg" alt="search icon" width={18} height={18} className="absolute left-3 top-1/2 -translate-y-1/2 opcaity-60" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder || "Search via ID... "}
                className="pl-9 pr-3 py-2 focus:outline-none transition-all w-full"
            />
        </div>
    )
}