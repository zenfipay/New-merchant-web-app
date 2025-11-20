"use client"

import * as React from 'react';
import Image from "next/image"
import { CustomButton } from "../custom/CustomButton";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CustomCheckbox } from '../custom/CustomCheckbox';
import { Payout } from './Payout';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';


const stableCoins = [
    {
        id: 1,
        label: "USDT",
        icon: "",
        items: [
            {
                value: "trc-20",
                label: "TRC-20"
            },
            {
                value: "solana",
                label: "Solana"
            },
            {
                value: "base",
                label: "Base"
            },
        ]
    },
    {
        id: 2,
        label: "USDC",
        icon: "",
        items: [
            {
                value: "trc-20",
                label: "TRC-20",
            },
            {
                value: "solana",
                label: "Solana",
            },
            {
                value: "base",
                label: "Base"
            },
        ]
    }
]

export default function StableCoinConverter() {

    const [ isOpen, setIsOpen ] = React.useState(false)
    const [ expandedCoin, setExpandedCoin ] = React.useState<string | null>(null);
    const [ stableCoinIcon, setStableCoinIcon ] = React.useState('')
    const [ selectedStableCoin, setSelectedStableCoin ] = React.useState("");
    const [ payoutStep, setPayoutStep ] = React.useState(1)
    const [ openConverter, setOpenConverter ] = React.useState<boolean>(false)

    const toggleCoinExpansion = (coinLabel: string) => {
        setExpandedCoin(prev => prev === coinLabel ? '' : coinLabel);
    };

    return (
        <div className="">
            <div className="w-full flex gap-3 py-6 space-y-3">
                {/* NGN ACCOUNT CARD */}
                <div className="w-1/2 h-36 flex flex-col justify-between py-5 px-4 rounded-lg border border-[#F5F5F5]">
                    <div className="flex gap-2">
                        <Image src="/icons/NGNflag.svg" alt="Nigerian flag icon" width={18} height={18} />
                        <p className="font-inter font-medium text-[13px]">NGN account</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="">
                            <p className="font-inter font-semibold text-[20px] text-[#20195F] leading-7">0.00</p>
                            <span className="font-inter font-normal text-[11px]">Nigerian Naira</span>
                        </div>
                        <Payout accountType="NGN account" icon="/icons/NGNflag.svg" balance={200000.00} />
                    </div>
                </div>

                {/* USD ACCOUNT CARD */}
                <div className="relative w-1/2 h-36 flex flex-col justify-between py-5 px-4 rounded-lg border border-[#F5F5F5]">
                    <div className="relative flex gap-2">
                        <Image src="/icons/NGNflag.svg" alt="Nigerian flag icon" width={18} height={18} />
                        <p className="font-inter font-medium text-[13px]">{selectedStableCoin}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                &darr;
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-40' align="start">
                                <DropdownMenuGroup>
                                    <Select>
                                        
                                    </Select>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="">
                            <p className="font-inter font-semibold text-[20px] text-[#20195F] leading-7">0.00</p>
                            <span className="font-inter font-normal text-[11px]">Nigerian Naira</span>
                        </div>
                        <Payout accountType="NGN account" icon="/icons/NGNflag.svg" balance={200000.00} />
                    </div>
                </div>
                    
            </div>
        </div>
    )
}