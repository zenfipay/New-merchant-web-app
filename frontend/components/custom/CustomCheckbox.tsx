"use client";

import React from "react";
import { cn } from "@/utils";

interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string | number;
  disabled?: boolean;
  className?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />

      <div
        className={`size-4 rounded-[3px] border- border-[#F5F5F5] ring-2 ring-[#112B69]/8 flex items-center justify-center transition-all duration-300
          ${checked ? "bg-[#014DFF] border-[#014DFF] ring-[#014DFF]/20" : "bg-white"}
          ${disabled ? "bg-gray-200" : "hover:border-[#014DFF]"}
        `}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {label && <span className={cn('text-[12px] leading-[100%] text-[#101010]', className)}>{label}</span>}
    </label>
  );
};


{/* <Checkbox
                                                id="filter"
                                                checked={checked}
                                                onCheckedChange={(value) => setChecked(value === true)}
                                                className="size-4 rounded-[3px] border border-[#F5F5F5] ring-2 ring-[#112B69]/8
                                                            data-[state=checked]:bg-[#014DFF]
                                                            data-[state=checked]:border-[#014DFF]
                                                            data-[state=checked]:ring-[#014DFF]/20
                                                            data-[state=checked]:text-white
                                                            flex items-center justify-center"
                                            /> */}