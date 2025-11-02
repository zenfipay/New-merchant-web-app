"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";

export type Country = {
  id: number;
  code: string;
  name: string;
  flag: string;
};

export const countries: Country[] = [
  { id: 1, code: "BR", flag: "/", name: "Benin Republic" },
  { id: 2, code: "GH", flag: "/", name: "Ghana" },
  { id: 3, code: "NG", flag: "/", name: "Nigeria" },
  { id: 4, code: "SA", flag: "/", name: "South Africa" },
];

export type CountrySelectProps = {
  value?: string | null; // store country code
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function CountrySelect({
  value,
  onChange,
  placeholder = "Select country...",
}: CountrySelectProps) {
  return (
    <Select
      value={value || ""}
      onValueChange={(val) => onChange?.(val)}
    >
      <SelectTrigger className="w-full font-inter font-medium py-3 px-2 cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="">
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code} className="font-inter font-medium text-[13px]">
            <Image src={country.flag} alt="countries flag" width={30} height={20}  className="w-5 h-5 rounded-full bg-black"/>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
