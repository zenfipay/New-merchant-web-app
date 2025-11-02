"use client"

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder: string;
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, placeholder, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={cn("bg-white w-full h-[42px] rounded-lg p-3 border border-[#EEEEEE] text-[13px] text-[#2B2B2B] font-inter font-medium leading-[100%] placeholder:text-[#999999] focus:outline-none focus:border focus:border-[#20195F] cursor-text", className)}
                {...props}
            />
        )
    }
)

Input.displayName = "Input";